import { Injectable, Logger } from "@nestjs/common";
import { CreateStrainDto } from "./dto";
import {
  UpdateStrainDto,
  getAllStrainDto,
  THC_RANGES,
} from "./dto/request.dto";
import { StrainRepository } from "./strain.repository";
import { Prisma } from "@prisma/client";
import { CONSTANT, MESSAGES } from "src/constants";
import { UtilsService } from "src/utils/utils.service";
import { MultiCurrency } from "src/config";
import { StrainIdParams } from "src/constants/dto";

@Injectable()
export class StrainService {
  constructor(
    private readonly strainRepository: StrainRepository,
    private readonly utilsService: UtilsService
  ) { }
  private readonly logger = new Logger();

  async getAllLocations() {
    try {
      return await this.strainRepository.getAllLocations();
    } catch (error) {
      throw error;
    }
  }

  async create(body: CreateStrainDto) {
    try {
      const exchangeRates =
        await this.utilsService.getLatestAmountForUSD(MultiCurrency);
      const exchangeRateArray = Object.entries(exchangeRates).map(
        ([currency, rate]) => ({
          currency,
          wholeSalePrice: body.wholeSalePrice * Number(rate),
          retailPrice: body.retailPrice * Number(rate),
        })
      );
      const planetIdArrayObject = body.planetDetailIds.map((id) => {
        return {
          planetDetailId: id,
        };
      });
      const locationsArray = body.locations.map((location) => ({
        locationId: location.locationId,
        stockQuantity: location.stockQuantity,
        isActive: location.isActive,
        isAvailable: location.isAvailable,
      }));

      const { locations, imageUrl, planetDetailIds, ...restBody } = body;
      return await this.strainRepository.createStrain({
        data: {
          ...restBody,
          imageUrl: imageUrl.replace(CONSTANT.S3_BUCKET_BASE_URL, ""),
          prices: {
            createMany: { data: exchangeRateArray, skipDuplicates: true },
          },
          strainLocations: {
            createMany: { data: locationsArray, skipDuplicates: true },
          },
          planets: {
            createMany: { data: planetIdArrayObject, skipDuplicates: true },
          },
        },
      });
    } catch (error) {
      this.logger.error("Error creating strain", error);
      throw error;
    }
  }

  async getAllStrains(query: getAllStrainDto, isDapp: boolean) {
    try {
      const {
        skip,
        take,
        page,
        order,
        orderBy,
        countryCode,
        search,
        thcLevels,
        feelings,
        helpsWith,
        planetNames,
      } = query;
      let where: Prisma.StrainWhereInput = {
        isDeleted: false,
      };

      // Prepare THC range filter based on multiple levels
      const thcRange = thcLevels
        ? thcLevels.map((level) => ({
          thc: { gte: THC_RANGES[level].min, lte: THC_RANGES[level].max },
        }))
        : undefined;
      const searchBy = search
        ? [
          { name: { contains: search, mode: Prisma.QueryMode.insensitive } },
          {
            flavour: { contains: search, mode: Prisma.QueryMode.insensitive },
          },
          {
            feelings: {
              contains: search,
              mode: Prisma.QueryMode.insensitive,
            },
          },
          {
            helpsWith: {
              contains: search,
              mode: Prisma.QueryMode.insensitive,
            },
          },
          {
            description: {
              contains: search,
              mode: Prisma.QueryMode.insensitive,
            },
          },
          {
            effects: { contains: search, mode: Prisma.QueryMode.insensitive },
          },
        ]
        : undefined;

      // Filter by feelings
      const byFeelings = feelings
        ? feelings.map((feeling) => ({
          feelings: { contains: feeling, mode: Prisma.QueryMode.insensitive },
        }))
        : undefined;

      // Filter by helpsWith
      const byHelpsWith = helpsWith
        ? helpsWith.map((item) => ({
          helpsWith: { contains: item, mode: Prisma.QueryMode.insensitive },
        }))
        : undefined;

      where.AND =
        searchBy || thcRange || byHelpsWith || byFeelings
          ? [
            ...(searchBy ? [{ OR: searchBy }] : []),
            ...(thcRange ? [{ OR: thcRange }] : []),
            ...(byHelpsWith ? [{ OR: byHelpsWith }] : []),
            ...(byFeelings ? [{ OR: byFeelings }] : []),
          ]
          : undefined;

      // Filter by planet name (related table)
      where.planets = planetNames
        ? {
          some: {
            planetDetail: {
              name: {
                in: planetNames,
                mode: Prisma.QueryMode.insensitive,
              },
            },
          },
        }
        : undefined;

      if (isDapp) {
        where.isActive = true;
        where.isAvailable = true;
      }

      if (countryCode) {
        where.strainLocations = {
          some: {
            location: {
              countryCode: {
                equals: countryCode,
              },
            },
            isActive: isDapp ? true : undefined,
            isAvailable: isDapp ? true : undefined,
          },
        };
      }

      const { strains, count } = await this.strainRepository.getAllStrains({
        where,
        select: {
          id: true,
          name: true,
          description: true,
          retailPrice: true,
          wholeSalePrice: true,
          type: true,
          thc: true,
          cbd: true,
          cbg: true,
          batchNumber: true,
          feelings: true,
          helpsWith: true,
          effects: true,
          popularity: true,
          flavour: true,
          imageUrl: true,
          isAvailable: true,
          isActive: true,
          stockQuantity: true,
          expiryDate: true,
          discount: true,
          strainImages: {
            select: { strainImageUrl: true, altText: true },
          },
          prices: {
            select: {
              currency: true,
              retailPrice: true,
              wholeSalePrice: true,
            },
          },
          strainLocations: {
            where: {
              location: { countryCode: { equals: countryCode } },
            },
            select: { isActive: true, isAvailable: true, stockQuantity: true },
          },
        },
        orderBy: { [order]: orderBy },
        skip: skip,
        take: take,
      });

      // Transform imageUrl to full S3 URLs
      const strainsWithUrls = strains.map((strain: any) => ({
        ...strain,
        imageUrl: strain.imageUrl
          ? `${CONSTANT.S3_BUCKET_BASE_URL}${strain.imageUrl}`
          : null,
        strainImages: strain.strainImages?.map((img) => ({
          ...img,
          strainImageUrl: img.strainImageUrl
            ? `${CONSTANT.S3_BUCKET_BASE_URL}${img.strainImageUrl}`
            : null,
        })),
      }));

      return {
        strains: strainsWithUrls,
        paginationCount: count,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async updateStrainById(id: string, body: UpdateStrainDto) {
    try {
      if (body.locations) {
        const data = await this.strainRepository.deleteStrainLocations(id);
      }
      if (body.planetDetailIds) {
        await this.strainRepository.deleteStrainPlanets(id);
      }
      // Check if exchange rates are needed
      let exchangeRateArray = [];
      if (body.wholeSalePrice || body.retailPrice) {
        const exchangeRates =
          await this.utilsService.getLatestAmountForUSD(MultiCurrency);
        exchangeRateArray = Object.entries(exchangeRates).map(
          ([currency, rate]) => ({
            currency,
            wholeSalePrice: body.wholeSalePrice
              ? body.wholeSalePrice * Number(rate)
              : undefined,
            retailPrice: body.retailPrice
              ? body.retailPrice * Number(rate)
              : undefined,
          })
        );
      }

      // Prepare arrays for creating/updating relations
      const planetIdArrayObject =
        body.planetDetailIds?.map((id) => ({ planetDetailId: id })) || [];
      const locationsArray =
        body.locations?.map((location) => ({
          locationId: location.locationId,
          stockQuantity: location.stockQuantity,
          isActive: location.isActive,
          isAvailable: location.isAvailable,
        })) || [];

      // Extract non-relation fields from the body
      const { locations, imageUrl, planetDetailIds, ...restBody } = body;

      // Update the strain
      return await this.strainRepository.updateStrain({
        where: { id },
        data: {
          ...restBody,
          imageUrl: imageUrl?.replace(CONSTANT.S3_BUCKET_BASE_URL, ""),
          ...(exchangeRateArray.length > 0 && {
            prices: {
              updateMany: exchangeRateArray
                .filter((rate) => rate.wholeSalePrice || rate.retailPrice)
                .map((rate) => ({
                  where: { currency: rate.currency },
                  data: {
                    wholeSalePrice: rate.wholeSalePrice,
                    retailPrice: rate.retailPrice,
                  },
                })),
            },
          }),
          ...(locationsArray.length > 0 && {
            strainLocations: {
              createMany: {
                data: locationsArray,
                skipDuplicates: true,
              },
            },
          }),
          ...(planetIdArrayObject.length > 0 && {
            planets: {
              createMany: {
                data: planetIdArrayObject,
                skipDuplicates: true,
              },
            },
          }),
        },
      });
    } catch (error) {
      this.logger.error("Error updating strain", error);
      throw error;
    }
  }

  async removeStrainById(strainId: string) {
    try {
      const strain = await this.strainRepository.getStrainById({
        where: {
          id: strainId,
        },
        select: { id: true },
      });
      if (!strain) {
        throw new Error(MESSAGES.ERROR.STRAIN.NOT_FOUND);
      }
      await this.strainRepository.updateStrain({
        where: { id: strainId },
        data: { isDeleted: true, deletedAt: new Date() },
      });
      return MESSAGES.SUCCESS.DEFAULT;
    } catch (error) {
      throw error;
    }
  }

  async getStrainById(params: StrainIdParams, countryCode: string) {
    try {
      const { strainId } = params;
      const strain = await this.strainRepository.getStrainById({
        where: {
          id: strainId,
        },
        select: {
          id: true,
          //TODO: add volume here according to figma
          name: true,
          description: true,
          retailPrice: true,
          flavour: true,
          imageUrl: true,
          batchNumber: true,
          thc: true,
          cbd: true,
          cbg: true,
          strainId: true,
          wholeSalePrice: true,
          isAvailable: true,
          stockQuantity: true,
          expiryDate: true,
          discount: true,
          type: true,
          isActive: true,
          feelings: true,
          popularity: true,
          helpsWith: true,
          strainImages: {
            select: { strainImageUrl: true, altText: true },
          },
          prices: {
            select: {
              currency: true,
              retailPrice: true,
              wholeSalePrice: true,
            },
          },
          strainLocations: {
            where: countryCode ? { location: { countryCode } } : undefined,
            select: {
              location: {
                select: {
                  id: true,
                  country: true,
                  countryCode: true,
                },
              },
              stockQuantity: true,
              isActive: true,
              isAvailable: true,
            },
          },
          planets: {
            select: {
              planetDetailId: true,
              planetDetail: { select: { name: true, planetNo: true } },
            },
          },
        },
      });

      const strainWithAny: any = strain; // Cast to avoid TS errors
      if (!strainWithAny) {
        throw new Error(MESSAGES.ERROR.STRAIN.NOT_FOUND);
      }
      if (countryCode) {
        const {
          isAvailable = false,
          isActive = false,
          stockQuantity = 0,
        } = strainWithAny.strainLocations[0] || {};
        strainWithAny.isAvailable = isAvailable;
        strainWithAny.isActive = isActive;
        strainWithAny.stockQuantity = stockQuantity;
      }

      // Transform imageUrl to full S3 URL
      if (strainWithAny.imageUrl) {
        strainWithAny.imageUrl = `${CONSTANT.S3_BUCKET_BASE_URL}${strainWithAny.imageUrl}`;
      }

      if (strainWithAny.strainImages) {
        strainWithAny.strainImages = strainWithAny.strainImages.map((img) => ({
          ...img,
          strainImageUrl: img.strainImageUrl
            ? `${CONSTANT.S3_BUCKET_BASE_URL}${img.strainImageUrl}`
            : null,
        }));
      }

      return strainWithAny;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
