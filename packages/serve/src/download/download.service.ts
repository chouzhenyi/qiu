import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { EventEmitter } from 'events';
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import type { ResponseType } from 'axios';

/**
 * @description 存放文件的静态目录
 */
const __BASE_PATH__ = 'downloadResources';

interface DownloadParams {
  list: string[];
  index: number;
  targetPath: string;
  filename: string;
}
/**
 * @description 下载
 * @param url
 * @param responseType
 * @returns
 */
const downloadResource = async (
  url,
  responseType: ResponseType = 'arraybuffer',
) => {
  const res = await axios({
    url,
    method: 'GET',
    responseType,
  }).catch(() => {
    return {
      data: null,
    };
  });
  if (res.data === null) {
    console.log(`下载文件"${url}"失败`);
    return Promise.reject('');
  }
  return res.data;
};
/**
 * @description 下载m3u8的ts文件
 * @param targetPath
 * @param list
 * @param filename
 */
const downloadTsList = async (params: DownloadParams) => {
  const { targetPath, filename, list, index } = params;
  const source = list[index];
  const tsFileItemData = await downloadResource(source);
  writeFileSync(
    `${targetPath}/${filename}_${index}.ts`,
    tsFileItemData,
    'binary',
  );
};

const downloadTsListProxy = (params: DownloadParams) => {
  downloadTsList(params)
    .then(() => {
      downloadEventEmitter.emit('download-end', params);
    })
    .catch((err) => {
      const { message } = err;
      downloadEventEmitter.emit('download-err', params, message);
    });
};

/**
 * @description 解析ts文件列表
 * @param tsFileStr
 * @returns
 */
const generatorTSList = (tsFileStr) => {
  const list = tsFileStr.split('\n');
  const temp = [];
  const tsList = list.reduce((prev, cur) => {
    temp.push(cur);
    if (!!cur && !cur.includes('#EXT')) {
      return [...prev, cur];
    }
    return prev;
  }, []);
  return tsList;
};

/**
 * @description 创建下载目录
 * @param filename
 * @returns
 */
const createBasePath = (filename) => {
  const targetPath = `${__BASE_PATH__}/${filename}`;
  if (!existsSync(__BASE_PATH__)) {
    console.log(`路径“${__BASE_PATH__}”不存在，尝试创建`);
    mkdirSync(__BASE_PATH__);
  }
  if (!existsSync(targetPath)) {
    console.log(`路径“${targetPath}”不存在，尝试创建`);
    mkdirSync(targetPath);
  }
  return targetPath;
};
/**
 * @description 下载m3u8文件
 * @param url
 * @param filename
 * @returns
 */
const downloadM3U8 = async (url, filename) => {
  const targetPath = createBasePath(filename);
  const tsFileStr = await downloadResource(url, 'text');
  const list = await generatorTSList(tsFileStr);
  return { targetPath, list };
};

class DownloadEventEmitter extends EventEmitter {}

const downloadEventEmitter = new DownloadEventEmitter();
downloadEventEmitter.on('download-end', (params: DownloadParams) => {
  const { list, index } = params;
  const len = list.length;
  const curIndex = index + 1;
  console.log(`下载文件成功，当前（${index}）, 总共：${len}`);
  if (index + 1 < len) {
    downloadTsListProxy({ ...params, index: curIndex });
  }
});

downloadEventEmitter.on('download-err', (params: DownloadParams, err) => {
  const { index } = params;
  console.log(`下载到下标文件（${index}）时，出现错误`, err);
});

@Injectable()
export class DownloadService {
  async mergeResource() {
    console.log('merge-resource');
  }
  async downloadFile(url, filename) {
    const { targetPath, list } = await downloadM3U8(url, filename);
    const arr = list.splice(0, 10);
    const index = 0;
    downloadTsListProxy({ targetPath, list: arr, filename, index });
    return { targetPath };
  }
}
