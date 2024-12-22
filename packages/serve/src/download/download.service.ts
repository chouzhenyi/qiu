import { Injectable } from '@nestjs/common';

/**
 * @description 存放文件的静态目录
 */
const __BASE_PATH__ = 'downloadResources';

@Injectable()
export class DownloadService {
  async mergeResource() {
    console.log('merge-resource');
  }
  async downloadFile(url, filename) {
    // downloadFile(url, filename);
    return { url, filename };
  }
  checkProps({ url, name }) {
    if (!url || !name) {
      return 1;
    }
    return 0;
  }
}
