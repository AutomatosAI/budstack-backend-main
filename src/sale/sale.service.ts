import { Injectable, Logger, Query } from "@nestjs/common";
import { SaleRepository } from "./sale.repository";
import {
  createSaleDto,
  filterByRevenueChartDto,
  getAllSaleDto,
  GetAllStrainsRevenueDto,
  SaleIdDto,
  SaleSearch,
  updateSaleDto,
} from "./sale.dto";
import { OrderActivity, Prisma, SaleStage, User } from "@prisma/client";
import { UtilsService } from "src/utils/utils.service";
import { CONSTANT } from "src/constants";
import { LOGIN_TYPE } from "src/constants/enums";

@Injectable()
export class SaleService {
  constructor(
    private readonly saleRepository: SaleRepository,
    private readonly utilsService: UtilsService
  ) {}
  private readonly logger = new Logger();

  async create(body: createSaleDto) {
    try {
      return await this.saleRepository.createSale({
        data: body,
      });
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async getSalesSummary(user) {
    try {
      const { id } = user;
      const summary = await this.saleRepository.getSalesSummary();
      return { summary: summary };
    } catch (error) {
      throw error;
    }
  }

  async getClientsSalesSummary(user) {
    try {
      const { summary, count } = await this.saleRepository.groupBySale(
        {
          by: ["stage"],
          _count: {
            stage: true,
          },
          where: {
            nftId: user.primaryNftId,
          },
        },
        user.primaryNftId
      );

      const salesSummary = {
        [SaleStage.ONGOING]: 0,
        [SaleStage.LEADS]: 0,
        [SaleStage.CLOSED]: 0,
        totalCount: count,
      };

      summary.map((item) => {
        const { stage, _count } = item;
        salesSummary[stage] = _count.stage;
        return true;
      });

      return { summary: salesSummary, count };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async getAllStrainsWithRevenue(req, loginType: LOGIN_TYPE, query: GetAllStrainsRevenueDto) {
    try {
      const { id, role, primaryNftId } = req.user;
      let {
        startDate,
        endDate,
        countryCodes,
        clientIds,
        tokenIds,
        orderBy,
        search,
        skip,
        page,
        take,
      } = query;
      const data = await this.saleRepository.getAllSalesStrainsWithRevenue(
        loginType,
        primaryNftId,
        startDate,
        endDate,
        countryCodes,
        clientIds,
        tokenIds,
        search,
        take,
        skip
      );
      return { strains: data[0], paginationCount: data[1].length };
    } catch (error) {
      throw error;
    }
  }

  async getSalesRevenueSummary(req, loginType: LOGIN_TYPE) {
    try {
      const { id, role, primaryNftId } = req.user;
      const data = await this.saleRepository.getRevenueSummary(loginType, primaryNftId);
      return { summary: data };
    } catch (error) {
      throw error;
    }
  }

  async getRevenueChartData(req, loginType: LOGIN_TYPE, query: filterByRevenueChartDto) {
    try {
      const { id, role, primaryNftId } = req.user;
      let { startDate, endDate, tokenIds, countryCodes, clientIds } = query;
      const parameter = this.utilsService.getScaleParameter(startDate, endDate);
      const data: any = await this.saleRepository.getRevenueChartData(
        loginType,
        primaryNftId,
        startDate,
        endDate,
        parameter,
        tokenIds,
        countryCodes,
        clientIds
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

  async getAllSales(query: getAllSaleDto, user: User) {
    try {
      const where: Prisma.SaleWhereInput = {
        nftId: user.primaryNftId,
      };

      if (query.search) {
        if (query.searchBy === SaleSearch.clientName) {
          where.client = {
            OR: [
              { firstName: { contains: query.search, mode: "insensitive" } },
              { lastName: { contains: query.search, mode: "insensitive" } },
            ],
          };
        }
      }

      if (query.stage) {
        where.stage = query.stage;
      }

      const { sales, count } = await this.saleRepository.getAllSales({
        where,
        select: {
          id: true,
          createdAt: true,
          updatedAt: true,
          stage: true,
          description: true,
          orderId: true,
          client: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              phoneCountryCode: true,
              phoneCode: true,
              contactNumber: true,
              isActive: true,
            },
          },
        },
        orderBy: { createdAt: query.orderBy },
        skip: query.skip,
        take: query.take,
      });

      return {
        sales,
        paginationCount: count,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async updateSaleById(@Query() query: SaleIdDto, body: updateSaleDto) {
    try {
      const { id } = query;
      return await this.saleRepository.updateSale({
        where: {
          id,
        },
        data: body,
      });
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
