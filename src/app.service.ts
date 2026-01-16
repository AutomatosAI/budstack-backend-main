import { Injectable } from '@nestjs/common';
import { MESSAGES } from './constants/index';

@Injectable()
export class AppService {
    checkHealthStatus(): string {
    return MESSAGES.SUCCESS.DEFAULT;
  }
}
