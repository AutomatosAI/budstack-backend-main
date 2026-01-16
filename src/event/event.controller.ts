import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Req,
  BadRequestException,
  Res,
} from "@nestjs/common";
import { stringify } from "csv-stringify";
import { EventService } from "./event.service";
import { CreateEventDto, GetAllEventDto, UpdateEventDto } from "./dto";
import { EventIdDto, EventTypeParams } from "./dto/request.dto";
import { AuthGuard } from "@nestjs/passport";
import { Role } from "@prisma/client";
import { RoleGuard } from "src/guard/roles.guard";
import { Response } from "express";
import { UtilsService } from "src/utils/utils.service";

/**
 * Controller for handling HTTP requests related to event management.
 */
@Controller("")
export class EventController {
  constructor(private readonly eventService: EventService, private readonly utilsService:UtilsService) {}

  /**
   * Retrieves a summary of events including total, live, upcoming, and completed events.
   * @param req The request object
   * @returns Summary of events
   */
  @UseGuards(AuthGuard("jwt"), new RoleGuard([Role.ADMIN, Role.SUBADMIN]))
  @Get("events/summary")
  async getEventsSummary(@Req() req) {
    return this.eventService.getEventsSummary(req);
  }

  /**
   * Creates a new event using the provided data.
   * @param CreateEventDto Data for creating a new event
   * @returns The created event
   */
  @UseGuards(AuthGuard("jwt"), new RoleGuard([Role.ADMIN, Role.SUBADMIN]))
  @Post("events")
  async createEvent(@Body() CreateEventDto: CreateEventDto) {
    return this.eventService.create(CreateEventDto);
  }

  /**
   * Retrieves all events of a specific type based on the provided parameters and query options.
   * Protected by authentication and role-based authorization for users with roles ADMIN or SUBADMIN.
   *
   * @param params An object containing the event type (`eventType`).
   * @param query An object containing optional search and pagination parameters.
   * @returns A list of events filtered by the specified `eventType` and query options.
   */
  @UseGuards(AuthGuard("jwt"), new RoleGuard([Role.ADMIN, Role.SUBADMIN]))
  @Get("events/:eventType")
  async getAllEventsByType(
    @Param() params: EventTypeParams,
    @Query() query: GetAllEventDto
  ) {
    return this.eventService.getAllEvents(params.eventType, query);
  }
  @UseGuards(AuthGuard("jwt"), new RoleGuard([Role.ADMIN, Role.SUBADMIN]))
  @Get("events/:eventType/export")
  async getAllEventsExportByType(
    @Param() params: EventTypeParams,
    @Query() query: GetAllEventDto,
    @Res() res: Response,
  ) {
   const {events}= await this.eventService.getAllEvents(params.eventType, query);

   return this.utilsService.generateCsvResponse(res,events,"Events.csv")

  }

  /**
   * Retrieves all events with optional search and pagination parameters.
   * @param query Query parameters for filtering events
   * @returns List of events based on the query
   */
  @Get("marketplace/events")
  async getAllEvents(@Query() query: GetAllEventDto) {
    return this.eventService.getAllEvents(undefined, query);
  }

  /**
   * Updates an event by its ID using the provided data.
   * @param eventId ID of the event to update
   * @param body Data to update the event
   * @returns The updated event
   */
  @UseGuards(AuthGuard("jwt"), new RoleGuard([Role.ADMIN, Role.SUBADMIN]))
  @Patch("events/:id")
  async updateEventById(
    @Param() eventId: EventIdDto,
    @Body() body: UpdateEventDto
  ) {
    return await this.eventService.updateEventById(eventId.id, body);
  }
}
