import axios from 'axios';
import { existsSync, createWriteStream } from 'fs';

const downloadStreamFile = async (url, filePath) => {
  try {
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'stream',
    });

    const writer = createWriteStream(filePath);
    response.data.pipe(writer);
    await new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });

    console.log('文件下载完成');
  } catch (error) {
    console.error('下载文件时出错:', error);
  }
};

export const downloadTsFile = ({
  list = [],
  filename = '',
  saveDir = '',
  downloadPath = '',
}: {
  list: string[];
  filename: string;
  saveDir: string;
  downloadPath: string;
}) => {
  console.log(`即将下载文件: ${saveDir}`);
  list.forEach((pathname, index) => {
    const url = pathname.startsWith('http')
      ? pathname
      : `${downloadPath}${pathname}`;
    const name = pathname.split('/').pop();
    if (index < 3) {
      console.log(`"${filename}"文件 开始下载第${index + 1}个ts文件`);
      downloadStreamFile(url, `${saveDir}/${name}.ts`);
    }
  });
};

export const downloadFile = async ({
  url,
  filename,
  dirName,
}: {
  url: string;
  filename: string;
  dirName: string;
}) => {
  const { data } = await axios.get(url);

  const list = data.split(/\n/).filter((str) => {
    return !/^#/.test(str) && !!str;
  });
  const shell = await import('shelljs');

  if (list.length) {
    const saveDir = `${dirName}/${filename}`;

    if (!existsSync(saveDir)) {
      shell.exec(`mkdir -p ${saveDir}`);
    } else {
      console.log(`${saveDir} 目录已存在, 清理目录中文件`);
      shell.rm('-rf', saveDir);
      shell.exec(`mkdir -p ${saveDir}`);
    }
    const downloadUrl = new URL(url);
    const { href } = downloadUrl;
    const downloadPath = href.replace('index.m3u8', '');
    downloadTsFile({ list, filename, saveDir, downloadPath });
  }
};
