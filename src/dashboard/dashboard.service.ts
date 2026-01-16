import { Injectable, Logger } from "@nestjs/common";
import { DashboardRepository } from "./dashboard.repository";
import { MESSAGES } from "src/constants";
import { range } from "rxjs";
import { OrderStatus, User } from "@prisma/client";

@Injectable()
export class DashboardService {
  constructor(private readonly dashboardRepository: DashboardRepository) {}
  private readonly logger = new Logger();

  async getSummary(req) {
    try {
      const { id, role } = req.user;
      return await this.dashboardRepository.getSummary();
    } catch (error) {
      throw error;
    }
  }

  async getDappSummary(user: User) {
    try {
      const currentDateMinusOneMonth = new Date();
      currentDateMinusOneMonth.setMonth(
        currentDateMinusOneMonth.getMonth() - 1
      );
      return await this.dashboardRepository.getDappSummary({
        clientWhere: {
          nftId: user.primaryNftId,
        },
        strainWhere: {},
        orderWhere: {
          nftId: user.primaryNftId,
        },
        estimateProfitWhere: {
          createdAt: {
            lt: currentDateMinusOneMonth,
          },
          orderStatus: OrderStatus.DELIVERED,
          nftId: user.primaryNftId,
        },
        totalProfitWhere: {
          nftId: user.primaryNftId,
          orderStatus: {
            in: [
              OrderStatus.SHIPPED,
              OrderStatus.PROCESSING,
              OrderStatus.DELIVERED,
            ],
          },
        },
      });
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async getAnalytics(params, user: User) {
    try {
      const parameter = this.getScaleParameter(
        params.startDate,
        params.endDate
      );
      params.endDate = new Date(params.endDate).setDate(
        new Date(params.endDate).getDate() + 1
      );
      params.startDate = this.getDate(params.startDate);
      params.endDate = this.getDate(params.endDate);
      params.parameter = parameter;
      const analytics = await this.dashboardRepository.getAnalytics(
        params,
        user.primaryNftId
      );
      return analytics.graphData.map((obj, index) => {
        return {
          name: this.getDayFromDate(obj.range, index, analytics.meta.parameter),
          value: obj.data,
          date: obj.range,
        };
      });
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  private getDayFromDate(dateString, index, parameter: string) {
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
}
