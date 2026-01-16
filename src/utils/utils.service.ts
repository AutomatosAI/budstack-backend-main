import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
} from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { configData } from "src/config";
import { CONSTANT, MESSAGES } from "src/constants";
import { EmailService } from "src/email/email.service";
import { CreateTokenDTO, TOKEN_TYPE } from "./utils.dto";
import { firstValueFrom, map, catchError } from "rxjs";
import { stringify } from "csv-stringify";
import { Response } from "express";
import * as crypto from "crypto";

@Injectable()
export class UtilsService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
    private readonly httpService: HttpService
  ) {}

  private readonly logger = new Logger();
  config: any = configData(this.configService);
  async createToken(data: CreateTokenDTO, expiry = null) {
    try {
      const secret = this.getSecret(data.tokenType);
      const access_token = await this.jwtService.signAsync(data, {
        secret,
        expiresIn: expiry ? expiry : CONSTANT.TOKEN_EXPIRY,
      });
      return access_token;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async decodeToken(body) {
    try {
      // Verifies and decodes the token.
      const { token, type } = body;
      const secret = this.getSecret(type);

      return await this.jwtService.verifyAsync(token, {
        secret,
      });
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async sendEmailForTwoStepVerification(user) {
    try {
      const payload = {
        id: user.id,
        tokenType: TOKEN_TYPE.TWO_STEP_VERIFICATION,
      };
      const token = await this.createToken(payload);

      await this.emailService.sendEmail({
        data: { path: "/two-step-verification", payload: token },
        subject: CONSTANT.EMAIL_SUBJECT.TWO_STEP_VERIFICATION,
        mail_type: CONSTANT.MAIL_TYPE.TWO_STEP_VERIFICATION,
        to_user: user,
        userType: undefined,
      });
      return `${MESSAGES.SUCCESS.SEND_EMAIL} ${user.email}`;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  getSecret(tokenType: string): string {
    switch (tokenType) {
      case TOKEN_TYPE.LOGIN:
        return this.config.JWT_SECRET_LOGIN;
      case TOKEN_TYPE.EMAIL_VERIFICATION:
        return this.config.JWT_SECRET_VERIFY_EMAIL;
      case TOKEN_TYPE.TWO_STEP_VERIFICATION:
        return this.config.JWT_SECRET_2FA;
      default:
        throw new Error("Invalid token type");
    }
  }

  async getLatestAmountForUSD(symbols: string[]) {
    const base = "usd";
    const response = await firstValueFrom(
      this.httpService
        .get(
          `https://min-api.cryptocompare.com/data/price?fsym=${base}&tsyms=${symbols}`
        )
        .pipe(
          map((res) => res.data),
          catchError((e) => {
            console.log("error:::", e);
            throw new ForbiddenException("API not available");
          })
        )
    );
    return response;
  }

  getDayFromDate(dateString, index, parameter: string) {
    const date = new Date(dateString);
    if (parameter === "DAY") {
      const weekday = date.getDay();
      const weekdays = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const weekdayName = weekdays[weekday];
      return weekdayName;
    } else if (parameter === "WEEK") {
      return `WEEK ${index + 1}`;
    } else if (parameter === "MONTH") {
      const monthNumber = date.getMonth() + 1;
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const monthName = monthNames[date.getMonth()];
      return monthName;
    } else if (parameter === "YEAR") {
      const year = date.getFullYear();
      return year;
    }
    return "NOT_VALID";
  }

  getDate(date) {
    const validDBDate = new Date(date)
      .toISOString()
      .split("T")[0]
      .replace(/-/g, "/");
    return new Date(validDBDate);
  }

  getDateDiff(date1, date2) {
    date1 = this.getDate(date1);
    date2 = this.getDate(date2);
    const diffInMs = Math.abs(date2 - date1);

    const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

    return diffInDays;
  }

  getScaleParameter(startDate, endDate) {
    const diff = this.getDateDiff(startDate, endDate);
    if (diff <= 30) {
      return "DAY";
    } else if (30 < diff && diff <= 90) {
      return "WEEK";
    } else if (90 < diff && diff <= 730) {
      return "MONTH";
    } else {
      return "YEAR";
    }
  }

  formatDateToUTC(date: Date) {
    return new Date(date).toISOString().split("T")[0];
  }

  generateCsvResponse(res: Response, data: any[], fileName: string): boolean {
    try {
      stringify(data, { header: true }, (err, output) => {
        if (err) {
          throw new BadRequestException(MESSAGES.ERROR.CSV.NOT_CREATED);
        }

        res.setHeader("Content-Type", "text/csv");
        res.setHeader(
          "Content-Disposition",
          `attachment; filename=${fileName}`
        );
        res.status(200).send(output);
      });
      return true;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(MESSAGES.ERROR.CSV.NOT_CREATED);
    }
  }

  generateNonce() {
    const length = 10;
    const buffer = crypto.randomBytes(length);
    // Convert each byte to a digit (0-9)
    let nonce = buffer.reduce((acc, byte) => acc + (byte % 10).toString(), "");
    // If the length is odd, we need to trim the last character to match the desired length
    if (nonce.length > length) {
      nonce = nonce.slice(0, length);
    }
    return parseInt(nonce, 10);
  }
}
