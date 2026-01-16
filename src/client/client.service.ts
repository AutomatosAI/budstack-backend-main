import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import {
  ClientIncludesDto,
  ClientSearch,
  CreateClientDto,
  GetAllClientDto,
  ClientIdParams,
  UpdateClientDto,
  filterByCountryDto,
  updateClientStatusDto,
  ClientQueryFilter,
  ClientApprovalDto,
  ClientRejectionDto,
} from "./dto/request.dto";
import { ClientRepository } from "./client.repository";
import {
  AdminApprovalOnClient,
  Client,
  ClientActivity,
  PermissionType,
  Prisma,
  Role,
  SaleStage,
} from "@prisma/client";

import { CONSTANT, MESSAGES } from "src/constants";
import { EmailService } from "src/email/email.service";
import { UtilsService } from "src/utils/utils.service";
import { filterByDate } from "src/constants/dto";
import { UserRepository } from "src/user/user.repository";
import { STATUS } from "src/user/user.dto";
import { KYC_STATUS, LOGIN_TYPE } from "src/constants/enums";
import { KycService } from "src/kyc/kyc.service";
import { NotificationsService } from "src/notifications/notifications.service";
import { ClientsSummary } from "src/common/response.dto";

@Injectable()
export class ClientService {
  constructor(
    private readonly clientRepository: ClientRepository,
    private readonly notificationService: NotificationsService,
    private readonly userRepository: UserRepository,
    private readonly kycService: KycService,
    private readonly utilsService: UtilsService,
    private readonly emailService: EmailService
  ) {}
  private readonly logger = new Logger();
  private readonly clientIncludes = [
    "shippings",
    "nft",
    "orders",
    "documents",
    "clientBusinesses",
    "sales",
  ];

  async createClient(
    createClientDto: CreateClientDto,
    user
  ): Promise<{ client: Client; message: string }> {
    try {
      const { clientBusiness, shipping, medicalRecord, ...clientData } =
        createClientDto;
      const { primaryNftId } = user;
      const client = await this.clientRepository.getClientById({
        where: { email: createClientDto.email },
      });
      if (client) {
        throw new ConflictException(MESSAGES.ERROR.CLIENT.EMAIL_ALREADY_EXISTS);
      }
      const isPhoneExist = await this.clientRepository.getClientById({
        where: { contactNumber: createClientDto.contactNumber },
      });
      if (isPhoneExist) {
        throw new ConflictException(
          MESSAGES.ERROR.CLIENT.CONTACT_NUMBER_ALREADY_EXISTS
        );
      }
      const caseId = await this.kycService.createCaseForUser({
        firstName: clientData.firstName,
        lastName: clientData.lastName,
        email: clientData.email,
        phoneNumber: `${clientData.phoneCode}${clientData.contactNumber}`,
      });
      const clientCreated = await this.clientRepository.createClient({
        data: {
          ...clientData,
          nftId: primaryNftId,
          caseId: caseId,
          ...(clientBusiness && {
            clientBusinesses: {
              create: { ...clientBusiness },
            },
          }),
          shippings: {
            create: { ...shipping },
          },
          clientCart: {
            create: {},
          },
          sales: {
            create: {
              stage: SaleStage.LEADS,
              nftId: primaryNftId,
            },
          },
          medicalRecord: medicalRecord
            ? {
                create: medicalRecord,
              }
            : undefined,
        },
      });
      await this.notificationService.sendUserNotification({
        clientId: clientCreated.id,
        title: CONSTANT.NOTIFICATION.CLIENT_ADDED.TITLE,
        message: CONSTANT.NOTIFICATION.CLIENT_ADDED.MESSAGE,
        eventId: undefined,
        orderId: undefined,
        userId: undefined,
      });
      return {
        client: clientCreated,
        message: `KYC link has been sent to client at ${clientCreated.email}`,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async getAllClients(
    req,
    loginType: LOGIN_TYPE,
    query: GetAllClientDto,
    tokenId: number
  ): Promise<{ clients: Client[]; paginationCount: number }> {
    try {
      const { id, role, primaryNftId } = req.user;
      if (
        loginType == LOGIN_TYPE.ADMIN &&
        role === Role.SUBADMIN &&
        !(await this.userRepository.getUserPermission({
          userId: id,
          permission: {
            in: [PermissionType.ClientVerification],
          },
        }))
      ) {
        throw new UnauthorizedException(MESSAGES.ERROR.UNAUTHORIZED_ACTION);
      }
      const where: Prisma.ClientWhereInput = {};
      if (loginType == LOGIN_TYPE.ADMIN && tokenId) {
        where.nft = {
          tokenId: tokenId,
        };
      } else if (loginType == LOGIN_TYPE.DAPP && primaryNftId) {
        where.nftId = primaryNftId;
      }

      if (query.startDate && query.endDate) {
        query.endDate.setDate(query.endDate.getDate() + 1);
        where.createdAt = {
          gte: query.startDate,
          lte: query.endDate,
        };
      }

      if (query.countryCodes) {
        where.shippings = {
          some: { countryCode: { in: query.countryCodes } },
        };
      }

      if (query.isVerified !== null) {
        where.isKYCVerified = query.isVerified;
      }

      if (query.search) {
        if (query.searchBy === ClientSearch.clientName) {
          const searchTerms = query.search.split(" ");
          if (searchTerms.length === 2) {
            const [firstName, lastName] = searchTerms;
            where.AND = [
              { firstName: { contains: firstName, mode: "insensitive" } },
              { lastName: { contains: lastName, mode: "insensitive" } },
            ];
          } else {
            where.OR = [
              { firstName: { contains: query.search, mode: "insensitive" } },
              { lastName: { contains: query.search, mode: "insensitive" } },
              { email: { contains: query.search, mode: "insensitive" } },
            ];
          }
        }
      }

      if (query.status) {
        where.isActive = query.status == STATUS.ACTIVE ? true : false;
      }

      if (query.adminApproval) {
        where.adminApproval = query.adminApproval;
      }

      const orderBy: Prisma.ClientOrderByWithRelationInput = {};
      if (query.adminApproval === AdminApprovalOnClient.VERIFIED) {
        orderBy.verifiedAt = query.orderBy
          ? { sort: query.orderBy, nulls: "last" }
          : { sort: Prisma.SortOrder.desc, nulls: "last" };
      } else if (query.adminApproval === AdminApprovalOnClient.REJECTED) {
        orderBy.rejectedAt = query.orderBy
          ? { sort: query.orderBy, nulls: "last" }
          : { sort: Prisma.SortOrder.desc, nulls: "last" };
      } else {
        orderBy.createdAt = query.orderBy
          ? query.orderBy
          : Prisma.SortOrder.desc;
      }

      const { clients, count } = await this.clientRepository.getAllClients({
        where,
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phoneCountryCode: true,
          phoneCode: true,
          contactNumber: true,
          isActive: true,
          adminApproval: true,
          isKYCVerified: true,
          verifiedAt: true,
          rejectedAt: true,
          rejectionNote:
            query?.adminApproval &&
            query?.adminApproval == AdminApprovalOnClient.REJECTED
              ? true
              : false,
          clientLogs:
            query?.adminApproval &&
            query?.adminApproval == AdminApprovalOnClient.VERIFIED
              ? {
                  where: { activity: ClientActivity.Approved },
                  select: { activity: true, createdAt: true },
                }
              : false,
          nft: { select: { tokenId: true, ownerId: true } },
          shippings: { select: { country: true } },
          createdAt: true,
          updatedAt: true,
          clientCart: {
            select: {
              id: true,
            },
          },
        },
        orderBy,
        skip: query.skip,
        take: query.take,
      });

      return { clients, paginationCount: count };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async getAllClientsList(
    user,
    loginType: LOGIN_TYPE,
    query: ClientQueryFilter
  ): Promise<{ clients: Client[] }> {
    try {
      const { search, status, kyc } = query;
      const where: Prisma.ClientWhereInput = {
        nftId: loginType === LOGIN_TYPE.DAPP ? user.primaryNftId : undefined,
        adminApproval: "VERIFIED",
        isActive: status ? true : undefined,
        // isKYCVerified: kyc === KYC_STATUS.VERIFIED ? true : undefined,       // TODO: enable after KYC integration
        OR: search
          ? [
              { firstName: { contains: search, mode: "insensitive" } },
              { lastName: { contains: search, mode: "insensitive" } },
            ]
          : undefined,
      };

      const { clients } = await this.clientRepository.getAllClients({
        where,
        select: {
          id: true,
          firstName: true,
          lastName: true,
          clientCart: {
            select: {
              id: true,
            },
          },
          shippings: {
            select: {
              country: true,
              countryCode: true,
            },
          },
        },
        orderBy: { firstName: Prisma.SortOrder.asc },
      });

      return { clients };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async getClientById(params: ClientIdParams, user) {
    try {
      const { clientId } = params;

      const client = await this.clientRepository.getClientById({
        where: {
          id: clientId,
          nftId: user?.primaryNftId ? user.primaryNftId : undefined,
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phoneCountryCode: true,
          phoneCode: true,
          contactNumber: true,
          isActive: true,
          nft: { select: { tokenId: true, ownerId: true } },
          adminApproval: true,
          isKYCVerified: true,
          createdAt: true,
          updatedAt: true,
          clientCart: {
            select: {
              id: true,
            },
          },
          shippings: {
            select: {
              id: true,
              address1: true,
              address2: true,
              landmark: true,
              city: true,
              state: true,
              country: true,
              countryCode: true,
              postalCode: true,
              createdAt: true,
            },
            orderBy: {
              createdAt: Prisma.SortOrder.desc,
            },
          },
          clientBusinesses: {
            select: {
              id: true,
              name: true,
              businessType: true,
              address1: true,
              address2: true,
              landmark: true,
              city: true,
              state: true,
              country: true,
              countryCode: true,
              postalCode: true,
              createdAt: true,
            },
            orderBy: {
              createdAt: Prisma.SortOrder.desc,
            },
          },
          medicalRecord: true,
        },
      });

      if (!client) {
        throw new Error(MESSAGES.ERROR.CLIENT.NOT_FOUND);
      }

      return client;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async updateClient(clientId: string, body: UpdateClientDto, user) {
    try {
      const { clientBusiness, shipping, medicalRecord, ...updateData } = body;
      const { email, phoneCode, contactNumber, firstName, lastName } =
        updateData;

      // Fetch existing client data
      const existingClient = await this.clientRepository.getClientById({
        where: { id: clientId, nftId: user.primaryNftId },
      });

      if (!existingClient) {
        throw new NotFoundException(MESSAGES.ERROR.CLIENT.NOT_FOUND);
      }

      // Check for conflicts with email
      if (email && email !== existingClient.email) {
        const conflictingClientByEmail =
          await this.clientRepository.getClientDetails({
            where: { email },
          });
        if (conflictingClientByEmail) {
          throw new ConflictException(
            MESSAGES.ERROR.CLIENT.EMAIL_ALREADY_EXISTS
          );
        }
      }

      // Check for conflicts with contact number
      if (contactNumber && contactNumber !== existingClient.contactNumber) {
        const conflictingClientByPhone =
          await this.clientRepository.getClientDetails({
            where: { contactNumber },
          });
        if (conflictingClientByPhone) {
          throw new ConflictException(
            MESSAGES.ERROR.CLIENT.CONTACT_NUMBER_ALREADY_EXISTS
          );
        }
      }

      // Determine if a new case is required (email updated)
      let caseId = existingClient.caseId;
      if (
        email &&
        email !== existingClient.email &&
        !existingClient.isKYCVerified
      ) {
        caseId = await this.kycService.createCaseForUser({
          firstName: firstName || existingClient.firstName,
          lastName: lastName || existingClient.lastName,
          email,
          phoneNumber: `${phoneCode || existingClient.phoneCode}${
            contactNumber || existingClient.contactNumber
          }`,
        });
      }

      // Prepare the update payload
      const updatePayload: Prisma.ClientUpdateInput = {
        ...updateData,
        caseId,
        clientBusinesses: {
          updateMany: {
            data: clientBusiness || {},
            where: { clientId },
          },
        },
        shippings: {
          updateMany: {
            data: shipping || {},
            where: { clientId },
          },
        },
        medicalRecord: medicalRecord
          ? {
              upsert: {
                create: {
                  ...medicalRecord, // Create a new record if it doesn't exist
                },
                update: {
                  ...medicalRecord, // Update the record if it exists
                },
              },
            }
          : undefined,
      };

      // Perform the update
      return await this.clientRepository.updateClient({
        where: {
          id: clientId,
          nftId: user.primaryNftId,
        },
        data: updatePayload,
      });
    } catch (error) {
      this.logger.error(error.message || error);
      throw error;
    }
  }

  async updateClientStatus(req, clientId: string, body: updateClientStatusDto) {
    try {
      const { id, role } = req.user;
      if (
        role === Role.SUBADMIN &&
        !(await this.userRepository.getUserPermission({
          userId: id,
          permission: {
            in: [PermissionType.ClientVerification],
          },
        }))
      ) {
        throw new UnauthorizedException(MESSAGES.ERROR.UNAUTHORIZED_ACTION);
      }
      const { isApproved, rejectionNote, isActive, isDelete } = body;
      const isExist = await this.clientRepository.getClientById({
        where: { id: clientId },
        select: { firstName: true, lastName: true, email: true },
      });
      if (!isExist) {
        throw new BadRequestException(MESSAGES.ERROR.CLIENT.NOT_FOUND);
      }
      const data: Prisma.ClientUncheckedUpdateInput = {};
      let title: string;
      let message: string;
      if (isApproved === true) {
        data.adminApproval = AdminApprovalOnClient.VERIFIED;
        (data.verifiedAt = new Date()), (data.isActive = true);
        data.clientLogs = {
          create: { userId: id, activity: ClientActivity.Approved },
        };
        title = CONSTANT.NOTIFICATION.CLIENT_VERIFIED.TITLE;
        message = CONSTANT.NOTIFICATION.CLIENT_VERIFIED.MESSAGE;
      } else if (isApproved === false) {
        data.adminApproval = AdminApprovalOnClient.REJECTED;
        data.rejectionNote = rejectionNote;
        data.rejectedAt = new Date();
        data.clientLogs = {
          create: { userId: id, activity: ClientActivity.Rejected },
        };
        title = CONSTANT.NOTIFICATION.CLIENT_REJECTED.TITLE;
        message = CONSTANT.NOTIFICATION.CLIENT_REJECTED.MESSAGE;
      } else if (isActive === true) {
        data.isActive = true;
        data.clientLogs = {
          create: { userId: id, activity: ClientActivity.Active },
        };
      } else if (isActive === false) {
        data.isActive = false;
        data.clientLogs = {
          create: { userId: id, activity: ClientActivity.InActive },
        };
      } else if (isDelete) {
        data.deletedAt = new Date();
        data.clientLogs = {
          create: { userId: id, activity: ClientActivity.Deleted },
        };
        message = CONSTANT.NOTIFICATION.CLIENT_DELETED.MESSAGE(
          isExist.firstName,
          isExist.lastName
        );
      }
      const updatedData = await this.clientRepository.updateClient({
        where: { id: clientId },
        data: data,
      });

      if (isApproved) {
        this.notificationService.sendUserNotification({
          clientId: clientId,
          title,
          message,
          eventId: undefined,
          orderId: undefined,
          userId: undefined,
        });
        this.emailService.sendEmail({
          data: { payload: { userName: isExist.firstName } },
          to_user: { email: isExist.email },
          subject: CONSTANT.EMAIL_SUBJECT.CLIENT_KYC_VERIFICATION_PASSED,
          mail_type: CONSTANT.MAIL_TYPE.CLIENT_KYC_VERIFICATION_PASSED,
          from_user: null,
          userType: undefined,
        });
      }

      return { message, data: updatedData };
    } catch (error) {
      throw error;
    }
  }

  async approveClients(req, body: ClientApprovalDto) {
    try {
      const { id, role } = req.user;
      const { clientIds } = body;
      const { clientLogs, clients } =
        await this.checkSubAdminPermissionAndClientsExistance(
          id,
          role,
          clientIds,
          ClientActivity.Approved
        );
      const title = CONSTANT.NOTIFICATION.CLIENT_VERIFIED.TITLE;
      const message = CONSTANT.NOTIFICATION.CLIENT_VERIFIED.MESSAGE;
      await this.clientRepository.updateClientsApproval({
        where: { id: { in: clientIds } },
        data: {
          isActive: true,
          adminApproval: AdminApprovalOnClient.VERIFIED,
          verifiedAt: new Date(),
        },
      });

      await this.clientRepository.createClientLogs({
        data: clientLogs,
      });
      for (let i = 0; i < clientIds.length; i++) {
        this.notificationService.sendUserNotification({
          clientId: clientIds[i],
          title,
          message,
          eventId: undefined,
          orderId: undefined,
          userId: undefined,
        });
        this.emailService.sendEmail({
          data: { payload: { userName: clients[clientIds[i]].name } },
          to_user: { email: clients[clientIds[i]].email },
          subject: CONSTANT.EMAIL_SUBJECT.CLIENT_KYC_VERIFICATION_PASSED,
          mail_type: CONSTANT.MAIL_TYPE.CLIENT_KYC_VERIFICATION_PASSED,
          from_user: null,
          userType: undefined,
        });
      }
      return MESSAGES.SUCCESS.DEFAULT;
    } catch (error) {
      throw error;
    }
  }

  async rejectClients(req, body: ClientRejectionDto) {
    try {
      const { id, role } = req.user;
      const { clientIds, rejectionNote } = body;
      const { clientLogs } =
        await this.checkSubAdminPermissionAndClientsExistance(
          id,
          role,
          clientIds,
          ClientActivity.Rejected
        );
      await this.clientRepository.updateClientsApproval({
        where: { id: { in: clientIds } },
        data: {
          adminApproval: AdminApprovalOnClient.REJECTED,
          rejectionNote,
          rejectedAt: new Date(),
        },
      });
      const title = CONSTANT.NOTIFICATION.CLIENT_REJECTED.TITLE;
      const message = CONSTANT.NOTIFICATION.CLIENT_REJECTED.MESSAGE;
      await this.clientRepository.createClientLogs({
        data: clientLogs,
      });
      for (let i = 0; i < clientIds.length; i++) {
        this.notificationService.sendUserNotification({
          clientId: clientIds[i],
          title,
          message,
          eventId: undefined,
          orderId: undefined,
          userId: undefined,
        });
      }
      return MESSAGES.SUCCESS.DEFAULT;
    } catch (error) {
      throw error;
    }
  }

  private async checkSubAdminPermissionAndClientsExistance(
    userId: string,
    role: Role,
    clientIds: string[],
    clientActivity: ClientActivity
  ): Promise<{
    clientLogs: Prisma.ClientLogsCreateManyInput[];
    clients: { [key: string]: { [key: string]: string } };
  }> {
    try {
      let clientLogs = [];
      const clients: { [key: string]: { [key: string]: string } } = {};
      if (
        role === Role.SUBADMIN &&
        !(await this.userRepository.getUserPermission({
          userId,
          permission: {
            in: [PermissionType.ClientVerification],
          },
        }))
      ) {
        throw new UnauthorizedException(MESSAGES.ERROR.UNAUTHORIZED_ACTION);
      }
      for (let i = 0; i < clientIds.length; i++) {
        const isExist = await this.clientRepository.getClientById({
          where: { id: clientIds[i] },
        });
        if (!isExist) {
          throw new BadRequestException(MESSAGES.ERROR.CLIENT.NOT_FOUND);
        }
        // Create client logs
        clientLogs.push({
          userId,
          clientId: clientIds[i],
          activity: clientActivity, // Ensure this matches the enum type
        });
        // Initialize client object if not exists
        if (!clients[isExist.id]) {
          clients[isExist.id] = {};
        }
        clients[isExist.id]["name"] = isExist.firstName;
        clients[isExist.id]["email"] = isExist.email;
      }
      return { clientLogs, clients };
    } catch (error) {
      throw error;
    }
  }

  async getSummary(
    user,
    loginType: LOGIN_TYPE
  ): Promise<{ summary: ClientsSummary }> {
    try {
      const { id, primaryNftId, role } = user;
      if (
        loginType == LOGIN_TYPE.ADMIN &&
        role == Role.SUBADMIN &&
        !(await this.userRepository.getUserPermission({
          userId: id,
          AND: [{ permission: { in: [PermissionType.ClientVerification] } }],
        }))
      ) {
        throw new UnauthorizedException(MESSAGES.ERROR.ACCESS_DENIED);
      }
      const where: Prisma.ClientWhereInput = {};
      if (primaryNftId) {
        where.nftId = primaryNftId;
      }
      const { summary, count } = await this.clientRepository.groupByClient({
        by: ["adminApproval"],
        _count: {
          adminApproval: true,
        },
        where,
      });

      const clientSummary = {
        [AdminApprovalOnClient.PENDING]: 0,
        [AdminApprovalOnClient.VERIFIED]: 0,
        [AdminApprovalOnClient.REJECTED]: 0,
        totalCount: count,
      };

      summary.map((item) => {
        const { adminApproval, _count } = item;
        clientSummary[adminApproval] = _count.adminApproval;
        return true;
      });

      return { summary: clientSummary };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async getClientsStatusBreakdown(
    req,
    loginType: LOGIN_TYPE,
    query: filterByCountryDto
  ) {
    try {
      const { id, primaryNftId } = req.user;
      console.log("primaryNftId: " + primaryNftId);

      let { startDate, endDate, countryCodes } = query;
      const data = await this.clientRepository.getClientsStatusBreakdown(
        loginType == LOGIN_TYPE.DAPP ? primaryNftId : undefined,
        startDate,
        endDate,
        countryCodes
      );
      const formattedResult = data.map((item: any) => ({
        name: item.status,
        value: parseFloat(item.percentage),
      }));
      return formattedResult;
    } catch (error) {
      throw error;
    }
  }

  async getClientChartData(
    req,
    loginType: LOGIN_TYPE,
    query: filterByCountryDto
  ) {
    try {
      const { id, primaryNftId } = req.user;
      let { startDate, endDate, countryCodes } = query;
      const parameter = this.utilsService.getScaleParameter(startDate, endDate);
      const data: any = await this.clientRepository.getClientChartData(
        loginType == LOGIN_TYPE.DAPP ? primaryNftId : undefined,
        startDate,
        endDate,
        parameter,
        countryCodes
      );
      return data.map((obj, index) => {
        return {
          name: this.utilsService.getDayFromDate(obj.range, index, parameter),
          value: obj.data,
          date: obj.range,
        };
      });
    } catch (error) {
      throw error;
    }
  }

  private getIncludesObject(includes: string[]) {
    const include: Prisma.ClientInclude = {};
    if (includes) {
      includes.forEach((col) => {
        col = col.trim();
        if (col !== "" && this.clientIncludes.includes(col))
          include[col] = true;
      });
    }
    return include;
  }
}
