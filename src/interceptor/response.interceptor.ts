import {
    BadRequestException,
    CallHandler,
    ExecutionContext,
    Injectable,
    Logger,
    NestInterceptor,
  } from '@nestjs/common';
  import { Observable, catchError, map, of } from 'rxjs';
  import { MESSAGES } from 'src/constants';
import { PageMetaDto } from 'src/constants/dto';
  
  export interface ValidResponse<T> {
    success: boolean;
    statusCode: number;
    message: string;
    data: T;
  }
  
  export interface ErrorResponse {
    success: boolean;
    message: string;
    error: string;
    errorCode: number;
    url: string;
    urlMethod: string;
  }
  
  @Injectable()
  export class ResponseInterceptor<T>
    implements NestInterceptor<T, ValidResponse<T> | ErrorResponse>
  {
    constructor() {}
    private logger = new Logger();
  
    async intercept(
      context: ExecutionContext,
      next: CallHandler<T>,
    ): Promise<Observable<ValidResponse<T> | ErrorResponse>> {
      const request = context.switchToHttp().getRequest();
  
      // for pagination
      const { page = 1, take = 10 } = request.query;
      // const page = pageNumber ? parseInt(pageNumber, 10) : 1;
      // const size = pageSize ? parseInt(pageSize, 10) : 10;
  
      return next.handle().pipe(
        map((data: any) => {
          const res = data;
          const message = data?.message;
          
          if (res === null || res === undefined || typeof res === undefined)
            throw new BadRequestException(MESSAGES.ERROR.SERVER_ERROR);
  
          let result: any = res;
  
          // for pagination
          if (!isNaN(res.paginationCount)) {
            const { paginationCount, ...data } = res;
            const pageMetaDto = new PageMetaDto({ pageOptionsDto: { page, take }, itemCount: paginationCount });
              result = {
                ...data,
                pageMetaDto,
              };
          }
  
          const validResponse: ValidResponse<T> = {
            success: true,
            statusCode: context.switchToHttp().getResponse().statusCode,
            message: message || MESSAGES.SUCCESS.DEFAULT,
            data: result,
          };
  
        //   const parsedForBigInt = JSONBig.parse(JSONBig.stringify(res));
          return validResponse;
        }),
        catchError((error: any) => {
          if (Array.isArray(error?.response?.message))
            error.response.message = error.response.message?.join(', ');
  
          context.switchToHttp().getResponse().statusCode =
            error.response?.statusCode ?? 500;
  
          //  Handled Exception
          if (error.response) {
            this.logger.error(
              error.response.message,
              `${request.method} ${request.originalUrl}`,
            );
  
            return of({
              success: false,
              message: error.response.message,
              errorCode: error.response.statusCode,
              error: error.response.error,
              url: request.url,
              urlMethod: request.method,
            });
          }
  
          //  Unhandled Exception
          this.logger.error(error, error.stack);
          const errorResponse: ErrorResponse = {
            success: false,
            message: error.message,
            errorCode: 500,
            error: MESSAGES.ERROR.SERVER_ERROR,
            url: request.url,
            urlMethod: request.method,
          };
  
          return of(errorResponse);
        }),
      );
    }
  }