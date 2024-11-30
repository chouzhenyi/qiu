import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { UserInterceptor } from './user/user.Interceptor';

@UseInterceptors(UserInterceptor)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getIndexData(): string {
    return this.appService.getIndexData();
  }
}
