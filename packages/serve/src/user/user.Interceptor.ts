import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { UserLoginService } from './user.login.service';

@Injectable()
export class UserInterceptor implements NestInterceptor {
  constructor(private readonly userLoginServie: UserLoginService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const [incomingMessage] = context.getArgs();
    const { accessToken } = incomingMessage.cookies || {};

    const { getUserJWTVerifyToken } = this.userLoginServie;
    // 解密token
    const token = getUserJWTVerifyToken(accessToken);
    const { path } = incomingMessage.route;
    console.log('用户拦截器 before', path);

    // token 过期时，直接返回无权限
    if (!token && !path.includes('public')) {
      const status = 401;
      const errorResponse = {
        statusCode: status,
        message: 'token 已过期',
      };
      throw new HttpException(errorResponse, status);
    }
    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() => {
          return console.log(`After... ${Date.now() - now}ms`);
        }),
      )
      .pipe(
        map((data) => {
          console.log(data);
          return data;
        }),
      );
  }
}
