import { Injectable } from '@nestjs/common';
import { create as svgCaptchaCreate, CaptchaObj } from 'svg-captcha';
import * as crypto from 'crypto';

@Injectable()
export class UserService {
  getUserFromSQL(): string {
    return '从数据去拉取的用户数据';
  }
  /**
   * @description 获取验证码
   * @returns
   */
  getCaptcha(): CaptchaObj {
    const captcha = svgCaptchaCreate({
      size: 4, // 生成几个验证码
      fontSize: 50, // 文字大小
      width: 100, // 宽度
      height: 30, // 高度
      background: '#639ef4', // 背景颜色
    });
    return captcha;
  }
  /**
   * @description 获取加密结果
   * @param text
   * @returns
   */
  getCryptoText(text): string {
    const hash = crypto.createHash('md5');
    //使用加密对象进行加密并生成十六进制字符串
    const result = hash.update(text).digest('hex');
    return result;
  }
}
