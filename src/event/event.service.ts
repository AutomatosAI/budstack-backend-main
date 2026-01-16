import { Injectable, Logger, Query } from "@nestjs/common";
import { CreateEventDto, GetAllEventDto, UpdateEventDto } from "./dto";
import { EventRepository } from "./event.repository";
import { Prisma } from "@prisma/client";
import { EventParamType } from "./dto/request.dto";
import { STATUS } from "src/user/user.dto";

@Injectable()
export class EventService {
  constructor(private readonly eventRepository: EventRepository) {}
  private readonly logger = new Logger();

  async getEventsSummary(req) {
    try {
      const now = new Date();
      const totalEventsPromise = this.eventRepository.getEventsCount({
        where: {},
      });

      const liveEventsPromise = this.eventRepository.getEventsCount({
        where: {
          isActive: true,
          startTime: {
            lte: now,
          },
          endTime: {
            gte: now,
          },
        },
      });

      const upcomingEventsPromise = this.eventRepository.getEventsCount({
        where: {
          startTime: {
            gt: now,
          },
        },
      });

      const completedEventsPromise = this.eventRepository.getEventsCount({
        where: {
          startTime: {
            lt: now,
          },
          endTime: {
            lt: now,
          },
        },
      });

      const [totalEvents, liveEvents, upcomingEvents, completedEvents] =
        await Promise.all([
          totalEventsPromise,
          liveEventsPromise,
          upcomingEventsPromise,
          completedEventsPromise,
        ]);

      return {
        summary: { totalEvents, liveEvents, upcomingEvents, completedEvents },
      };
    } catch (error) {
      throw error;
    }
  }

  async create(body: CreateEventDto) {
    try {
      return await this.eventRepository.createEvent({
        data: { eventDate: body.startTime, ...body },
      });
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async getAllEvents(eventType: EventParamType, query: GetAllEventDto) {
    try {
      const { page, status, skip, take, orderBy, search } = query;
      const currentDate = new Date();
      const where: Prisma.EventWhereInput = {};
      if (eventType === EventParamType.UPCOMING) {
        where.startTime = {
          gt: currentDate,
        };
      } else if (eventType === EventParamType.LIVE) {
        where.isActive = true;
        where.startTime = {
          lte: currentDate,
        };
        where.endTime = {
          gte: currentDate,
        };
      } else if (eventType === EventParamType.COMPLETED) {
        where.endTime = {
          lt: currentDate,
        };
      } else {
        where.isActive = true;
        where.endTime = {
          gte: currentDate,
        };
      }

      if (status) {
        where.isActive = status == STATUS.ACTIVE ? true : false;
      }

      if (search) {
        where.title = {
          contains: search,
          mode: "insensitive",
        };
      }

      const { events, count } = await this.eventRepository.getAllEvents({
        where,
        orderBy: { createdAt: orderBy ? orderBy : Prisma.SortOrder.desc },
        skip: skip,
        take: take,
      });

      return {
        events,
        paginationCount: count,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async updateEventById(eventId: string, body: UpdateEventDto) {
    try {
      const data: Prisma.EventUncheckedUpdateInput = {};
      body.startTime ? (data.eventDate = body.startTime) : null;
      return await this.eventRepository.updateEvent({
        where: {
          id: eventId,
        },
        data: { ...data, ...body },
      });
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
