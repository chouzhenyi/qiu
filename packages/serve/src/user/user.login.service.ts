import { Injectable } from '@nestjs/common';
import type { ConfigObject, CaptchaObj } from 'svg-captcha';
import { create as svgCaptchaCreate } from 'svg-captcha';
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';

// token加密添加的key
const encryptKey = 'USER_LOGIN_TOKEN';

/**
 * @description 用户登录相关服务
 */
@Injectable()
export class UserLoginService {
  /**
   * @description 生成验证码
   * @returns
   */
  getCaptcha(params: Partial<ConfigObject> = {}): CaptchaObj {
    const {
      size = 4,
      fontSize = 50, // 文字大小
      width = 100, // 宽度
      height = 30, // 高度
      background = '#639ef4', // 背景颜色
    } = params;
    const captcha = svgCaptchaCreate({
      size,
      fontSize,
      width,
      height,
      background,
    });
    return captcha;
  }
  /**
   * @description 生成MD5加密
   * @param text
   * @returns
   */
  getCryptoText(text): string {
    const hash = crypto.createHash('md5');
    // 使用加密对象进行加密并生成十六进制字符串
    const result = hash.update(text).digest('hex');
    return result;
  }
  /**
   * @description 生成 加密token
   * @param params
   * @param time
   * @returns
   */
  getUserJWTLoginToken(params: { id: number }, time: number = 60 * 60): string {
    return jwt.sign(params, encryptKey, { expiresIn: time });
  }
  /**
   * @description 生成token解密
   * @param token
   * @returns
   */
  getUserJWTVerifyToken(token: string) {
    try {
      const result = jwt.verify(token, encryptKey);
      return result;
    } catch (e) {
      console.log('解密token');
    }
    return null;
  }
}
