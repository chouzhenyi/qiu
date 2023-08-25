import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Header,
  Req,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUserInfo(): string {
    return this.userService.getUserFromSQL();
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
  @Post('login')
  userLogin(@Req() req, @Body() body) {
    const { username, password, remember, verificationCode } = body;
    const { getCryptoText } = this.userService;
    const code = getCryptoText(verificationCode?.toLowerCase?.());
    if (code !== req.session.verificationCode) {
      return { msg: '验证码错误', code: 1 };
    }
    return {
      msg: '',
      code: 0,
      data: {
        username,
        password: getCryptoText(password),
        remember,
      },
    };
  }
  /**
   * @description 获取验证码
   * @param req
   * @param res
   */
  @Get('verification/code')
  createCaptcha(@Req() req, @Res() res) {
    const { getCaptcha, getCryptoText } = this.userService;
    const { text: captchaText, data: captchaData } = getCaptcha();
    // 加密验证码
    const captchaTextByCrypto = getCryptoText(captchaText?.toLowerCase?.());
    req.session.verificationCode = captchaTextByCrypto;
    res.type('image/svg+xml');
    res.send(captchaData);
  }
}
