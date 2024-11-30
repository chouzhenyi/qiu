import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getUserFromSQL(): { msg: string } {
    return {
      msg: '从数据去拉取的用户数据',
    };
  }
}
