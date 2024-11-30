import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Header,
  Req,
  Res,
  Response,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserLoginService } from './user.login.service';
import { UserInterceptor } from './user.Interceptor';
import { apiPublicPath } from '../common/index';

@UseInterceptors(UserInterceptor)
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userLoginServie: UserLoginService,
  ) {}

  @Get()
  getUserInfo(@Req() req) {
    const { accessToken } = req.cookies;
    const { getUserJWTVerifyToken } = this.userLoginServie;
    // 解密token
    const token = getUserJWTVerifyToken(accessToken);
    if (token) {
      return this.userService.getUserFromSQL();
    } else {
      return { msg: 'token 已过期' };
    }
  }
  @Get('educationinfo/:level')
  getEducationInfo(@Param() params): string {
    const { level } = params;
    return `上过大学,学生编号：${level}`;
  }
  @Get('accountinfo')
  @Header('Cache-Control', 'max-age=3600')
  getAccountInfo(): string {
    return '用户账户信息';
  }
  /**
   * @description 登录
   * @param req
   * @param body
   * @returns
   */
  @Post(`${apiPublicPath}/login`)
  userLogin(@Req() req, @Body() body, @Res() res) {
    const { username, password, remember, verificationCode } = body;
    const {
      getCryptoText, // 加密函数
      getUserJWTLoginToken, // 生成token函数
    } = this.userLoginServie;
    // 生成取验证码
    const code = getCryptoText(verificationCode?.toLowerCase?.());
    if (code !== req.session.verificationCode) {
      res.send({ msg: '验证码错误', code: 1 });
    }

    const accessToken = getUserJWTLoginToken({ id: 123 });
    res.cookie('accessToken', accessToken);
    res.send({
      msg: '',
      code: 0,
      data: {
        username,
        password: getCryptoText(password),
        remember,
        accessToken,
      },
    });
  }
  /**
   * @description 获取验证码
   * @param req
   * @param res
   */
  @Get(`${apiPublicPath}/verification/code`)
  createCaptcha(@Req() req, @Res() res) {
    const { getCaptcha, getCryptoText } = this.userLoginServie;
    const { text: captchaText, data: captchaData } = getCaptcha();
    // 加密验证码
    const captchaTextByCrypto = getCryptoText(captchaText?.toLowerCase?.());
    req.session.verificationCode = captchaTextByCrypto;
    res.type('image/svg+xml');
    res.send(captchaData);
  }
}
