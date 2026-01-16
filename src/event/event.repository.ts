import { Injectable, Logger } from "@nestjs/common";
import { Event, Prisma } from "@prisma/client";
import { CONSTANT, MESSAGES } from "src/constants";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class EventRepository {
  constructor(private prisma: PrismaService) {}
  private readonly logger = new Logger();
  async createEvent(params: { data: Prisma.EventCreateInput }): Promise<Event> {
    try {
      const { data } = params;
      return await this.prisma.event.create({
        data,
      });
    } catch (error) {
      this.logger.error(error);
      throw new Error(MESSAGES.ERROR.EVENT.CREATE_FAILED);
    }
  }

  async updateEvent(params: {
    where: Prisma.EventWhereUniqueInput;
    data: Prisma.EventUncheckedUpdateInput;
  }): Promise<Event> {
    try {
      const { where, data } = params;
      return await this.prisma.event.update({ where, data });
    } catch (error) {
      if (error.code === CONSTANT.DB_ERROR_CODE.NOT_FOUND) {
        throw new Error(MESSAGES.ERROR.EVENT.NOT_FOUND);
      }
      this.logger.error(error);
      throw new Error(MESSAGES.ERROR.EVENT.UPDATE_FAILED);
    }
  }

  async getEventsCount(params: { where: Prisma.EventWhereInput }) {
    try {
      const { where } = params;
      const count = await this.prisma.event.count({
        where,
      });
      return count;
    } catch (error) {
      this.logger.error(error);
      throw new Error(MESSAGES.ERROR.EVENT.FETCH_FAILED);
    }
  }

  async getAllEvents(params: {
    where?: Prisma.EventWhereInput;
    select?: Prisma.EventSelect;
    orderBy?: Prisma.EventOrderByWithAggregationInput;
    take?: number;
    skip?: number;
  }): Promise<{ events: Event[]; count: number }> {
    try {
      const CHUNK_SIZE = 500; // Define the chunk size
      const { where, take } = params;
  
      // If take is greater than CHUNK_SIZE, fetch data in chunks
      if (take && take > CHUNK_SIZE) {
        const events: Event[] = [];
        let skipCount = 0;
        let remaining = take;
  
        while (remaining > 0) {
          const chunkTake = Math.min(CHUNK_SIZE, remaining);
          const chunkEvents = await this.prisma.event.findMany({
            ...params,
            skip: skipCount,
            take: chunkTake,
          });
  
          if (chunkEvents.length === 0) {
            break; // No more data to fetch
          }
  
          events.push(...chunkEvents);
          skipCount += chunkTake;
          remaining -= chunkTake;
        }
  
        const count = await this.prisma.event.count({ where });
        return { events, count };
      }
  
      // If take is less than or equal to CHUNK_SIZE, fetch all data at once
      const [events, count] = await this.prisma.$transaction([
        this.prisma.event.findMany({ ...params }),
        this.prisma.event.count({ where }),
      ]);
  
      return { events, count };
    } catch (error) {
      this.logger.error(error);
      throw new Error(MESSAGES.ERROR.EVENT.FETCH_FAILED);
    }
  }
}
