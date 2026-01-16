import { HttpService } from "@nestjs/axios";
import { CACHE_MANAGER, Cache } from "@nestjs/cache-manager";
import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { catchError, firstValueFrom, map } from "rxjs";
import { configData } from "src/config";
import { API_ROUTES, CONSTANT } from "src/constants/constant";
import { EmailService } from "src/email/email.service";
import { CREATE_CASE_FOR_INDIVIDUALS } from "src/graphql/queries/create_case";
import { GET_CASE_INFO_OF_INDIVIDUALS } from "src/graphql/queries/get_case_info";
import * as crypto from "crypto";
import { KycRepository } from "./kyc.repository";
import { ClientRepository } from "src/client/client.repository";
import { bool } from "aws-sdk/clients/signer";

@Injectable()
export class KycService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly kycRepository: KycRepository,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
    private readonly clientRepository: ClientRepository
  ) {}
  config: any = configData(this.configService);

  async kycLogin() {
    try {
      const body = {
        client_id: this.config.KYC_CLIENT_ID,
        client_secret: this.config.KYC_CLIENT_SECRET,
        audience: this.config.KYC_AUDIENCE,
        grant_type: this.config.KYC_GRANT_TYPE,
      };
      const response = await firstValueFrom(
        this.httpService
          .post(`${this.config.KYC_BASE_URL}/${API_ROUTES.KYC.LOGIN}`, body)
          .pipe(
            map((res) => res.data),
            catchError((e) => {
              console.log("error:::", e);
              throw new ForbiddenException("API not available");
            })
          )
      );
      await this.cacheManager.set("token", response.access_token, 86400);
      return response.access_token;
    } catch (error) {
      throw error;
    }
  }

  async createCaseForUser({
    firstName,
    lastName,
    email,
    phoneNumber,
  }: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
  }) {
    let token: string = await this.cacheManager.get("token");
    try {
      if (!token) {
        token = await this.kycLogin();
      }
      const variables = {
        input: {
          organizationId: this.config.KYC_ORGANIZATION_ID,
          initialState: "SUBMIT_TO_FIRST_AML",
          individuals: [
            {
              legalName: {
                firstName: firstName,
                middleName: "",
                lastName: lastName,
              },
              preferredName: {
                firstName: firstName,
                middleName: "",
                lastName: lastName,
              },
              emailAddress: email,
              phoneNumber: phoneNumber,
              needsVerification: true,
              isCaseContact: true,
            },
          ],
        },
      };
      const response = await firstValueFrom(
        this.httpService
          .post(
            `${this.config.KYC_BASE_URL}/${API_ROUTES.KYC.CREATE_CASE}`,
            {
              query: CREATE_CASE_FOR_INDIVIDUALS,
              variables,
            },
            { headers: { Authorization: `Bearer ${token}` } }
          )
          .pipe(
            map(async (res) => {
              return res.data;
            })
          )
          .pipe(
            catchError((e) => {
              console.log(e);
              throw new ForbiddenException("API not available");
            })
          )
      );
      if (response?.data?.createCaseForIndividuals?.individuals) {
        const verificationUrl =
          response?.data?.createCaseForIndividuals?.individuals[0]?.urls
            ?.verification?.url;
        const caseId = response?.data?.createCaseForIndividuals?.caseId;
        await this.emailService.sendEmail({
          data: {
            payload: {
              verificationUrl,
              userName: firstName,
            },
          },
          to_user: {
            email: email,
          },
          subject: CONSTANT.EMAIL_SUBJECT.CLIENT_KYC_VERIFICATION,
          mail_type: CONSTANT.MAIL_TYPE.CLIENT_KYC_VERIFICATION,
          from_user: null,
          userType: undefined,
        });
        return caseId;
      } else if (response?.data?.createCaseForIndividuals?.errors) {
        throw new BadRequestException(
          response?.data?.createCaseForIndividuals?.errors[0].message
        );
      } else {
        throw new BadRequestException(
          "Something went wrong while creating case for individual verification"
        );
      }
    } catch (error) {
      throw error;
    }
  }

  async getCaseDetailsOfUser(caseId: string, token: string) {
    const variables = {
      caseId,
    };
    const response = await firstValueFrom(
      this.httpService
        .post(
          `${this.config.KYC_BASE_URL}/${API_ROUTES.KYC.GET_CASE}`,
          {
            query: GET_CASE_INFO_OF_INDIVIDUALS,
            variables,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .pipe(
          map(async (res) => {
            return res.data;
          })
        )
        .pipe(
          catchError(async (e) => {
            // Handle token expiration by refreshing and retrying once
            if (e.response?.status === 401) {
              token = await this.kycLogin();
              await this.cacheManager.set("token", token);
              return this.getCaseDetailsOfUser(caseId, token); // Retry with new token
            }
            console.log("API error:", e);
            throw new ForbiddenException("API not available");
          })
        )
    );
    return response.data;
  }

  async kycWebhook(req) {
    try {
      const { eventType, caseId, officeKey } = req.body;
      const secretKey = Buffer.from(this.config.KYC_WEBHOOK_SECRET, "base64");
      const hmac = crypto
        .createHmac("sha256", secretKey)
        .update(Buffer.from(JSON.stringify(req.body), "utf8"))
        .digest("base64");

      if (hmac === req.headers["x-faml-signature"]) {
        if (eventType === "CaseStatusUpdated") {
          let token = await this.cacheManager.get<string>("token");
          if (!token) {
            token = await this.kycLogin();
          }
          const caseDetails = await this.getCaseDetailsOfUser(
            caseId.toString(),
            token
          );
          const overall =
            caseDetails?.caseDetails.individuals[0]
              ?.individualVerificationChecksStatus.overall;
          if (overall === "PASS") {
            await this.kycRepository.updateClientKycStatus(
              caseDetails.caseDetails.caseId
            );
          }
        }
      }
      return {
        message: "success",
      };
    } catch (error) {
      throw error;
    }
  }

  async checkKycStatusAndUpdate(): Promise<boolean | string> {
    try {
      const { clients } = await this.clientRepository.getAllClients({
        where: {
          caseId: { not: null },
          isKYCVerified: false,
          maxRetries: { lt: 2 },
        },
        select: {
          id: true,
          firstName: true,
          email: true,
          caseId: true,
          maxRetries: true,
        },
      });
      if (clients.length > 0) {
        let token = await this.cacheManager.get<string>("token");
        if (!token) {
          token = await this.kycLogin();
        }

        for (const client of clients) {
          const caseDetails = await this.getCaseDetailsOfUser(
            client.caseId,
            token
          );
          const caseStatus = caseDetails.caseDetails.caseStatus;
          const kycDone =
            caseDetails.caseDetails.individuals[0].latestVerificationReport
              .antiTampering == "CLEAR" ||
            caseDetails.caseDetails.individuals[0].latestVerificationReport
              .biometric == "CLEAR";
          if (caseStatus === "IN_PROGRESS") {
            if (kycDone) {
              await this.sendEmailOnVerificationFailed(
                client.firstName,
                client.email
              );
            } else {
              const verificationUrl =
                caseDetails.caseDetails.individuals[0]?.urls?.verification?.url;
              await this.sendEmailToStartVerification(
                client.firstName,
                client.email,
                verificationUrl
              );
            }
          } else {
            return "something went wrong";
          }
          await this.clientRepository.updateClient({
            where: { caseId: client.caseId },
            data: { maxRetries: { increment: 1 } },
          });
        }
        return true;
      } else {
        return "no pending verifications are available";
      }
    } catch (error) {
      throw error;
    }
  }

  private async sendEmailOnVerificationFailed(
    firstName: string,
    email: string
  ) {
    try {
      await this.emailService.sendEmail({
        data: {
          payload: {
            firstName,
          },
        },
        to_user: {
          email: email,
        },
        subject: CONSTANT.EMAIL_SUBJECT.CLIENT_KYC_VERIFICATION_FAILED,
        mail_type: CONSTANT.MAIL_TYPE.CLIENT_KYC_VERIFICATION_FAILED,
        from_user: null,
        userType: undefined,
      });
      await this.emailService.sendEmail({
        data: {
          payload: {
            customerName: firstName,
            customerEmail: email,
          },
        },
        to_user: {
          email: this.config.SUPPORT_ADMIN_EMAIL,
        },
        subject: CONSTANT.EMAIL_SUBJECT.CLIENT_KYC_VERIFICATION_FAILED_REVIEW,
        mail_type: CONSTANT.MAIL_TYPE.CLIENT_KYC_VERIFICATION_FAILED_REVIEW,
        from_user: null,
        userType: undefined,
      });
    } catch (error) {
      throw error;
    }
  }

  private async sendEmailToStartVerification(
    firstName: string,
    email: string,
    verificationUrl: string
  ) {
    try {
      await this.emailService.sendEmail({
        data: {
          payload: {
            firstName,
            verificationUrl,
          },
        },
        to_user: {
          email: email,
        },
        subject: CONSTANT.EMAIL_SUBJECT.CLIENT_KYC_VERIFICATION_FAILED,
        mail_type: CONSTANT.MAIL_TYPE.CLIENT_KYC_VERIFICATION_FAILED,
        from_user: null,
        userType: undefined,
      });
    } catch (error) {
      throw error;
    }
  }
}
