import { Injectable } from '@nestjs/common';
import { downloadFile } from './video/download';
/**
 * @description 存放文件的静态目录
 */
const __BASE_PATH__ = 'downloadResources';

@Injectable()
class DownloadService {
  async downloadFile(url, filename) {
    downloadFile({ url, filename, dirName: __BASE_PATH__ });
    return { url, filename };
  }
  checkProps({ url, name }) {
    if (!url || !name) {
      return 1;
    }
    return 0;
  }
}

export { DownloadService };
