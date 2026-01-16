import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Home')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('public/healthStatus')
  @ApiResponse({
    status: 200,
    description: 'Check health status',
  })
  checkHealthStatus(): string {
    return this.appService.checkHealthStatus();
  }
}
