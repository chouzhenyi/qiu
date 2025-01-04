import { Body, Controller, Get, Post } from '@nestjs/common';
import { DownloadService } from './download.service';

@Controller('download')
export class DownloadController {
  constructor(private readonly downloadService: DownloadService) {}
  @Get()
  getData(): string {
    return 'TODO: 可下载资源列表';
  }
  @Get('video')
  getDownloadData(): string {
    return '视频下载';
  }
  @Post('video')
  getResource(@Body() body) {
    const { url, name } = body;
    // const { checkProps, downloadFile } = this.downloadService;
    // const code = checkProps({ url, name });
    // if (!code) {
    //   downloadFile(url, name);
    //   return {
    //     code: 0,
    //     msg: '资源已经发起下载，稍后去下载列表查看结果！',
    //     data: {
    //       url,
    //       name,
    //     },
    //   };
    // }
    return {
      code: 1,
      msg: '参数不全',
      data: { url, name },
    };
  }
}
