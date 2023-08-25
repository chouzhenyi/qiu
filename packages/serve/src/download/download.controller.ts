import { Body, Controller, Get, Post } from '@nestjs/common';
import { DownloadService } from './download.service';

@Controller('download')
export class DownloadController {
  constructor(private readonly downloadService: DownloadService) {}
  @Get()
  getData(): string {
    return 'TODO: 可下载资源列表';
  }
  @Post('/resource')
  async getResource(@Body() body) {
    const { url, filename } = body;
    await this.downloadService.downloadFile(url, filename);
    return {
      code: 0,
      msg: '资源已经发起下载，稍后去下载列表查看结果！',
      data: {},
    };
  }
}
