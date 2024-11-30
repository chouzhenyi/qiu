import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getIndexData(): string {
    return 'Hello World!';
  }
}
