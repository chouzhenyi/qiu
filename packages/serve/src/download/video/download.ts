import axios from 'axios';
import { existsSync, createWriteStream, writeFileSync, unlinkSync } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';

const downloadStreamFile = async (url, filePath) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url,
        method: 'GET',
        responseType: 'stream',
      });

      const writer = createWriteStream(filePath);
      response.data.pipe(writer);
      // 监听 "open" 事件：文件打开时触发
      writer.on('open', () => {
        console.log(`开始写入文件：${filePath}`);
      });

      // 监听 "finish" 事件：所有数据写入完成且调用 end() 后触发
      writer.on('finish', () => {
        console.log(`文件写入完成：${filePath}`);
      });

      // 监听 "close" 事件：流关闭时触发（在 finish 之后）
      writer.on('close', () => {
        console.log(`文件流已关闭：${filePath}`);
        resolve(filePath);
      });

      // 监听 "error" 事件：发生错误时触发
      writer.on('error', (err) => {
        console.error(`写入文件时发生错误：${filePath}`, err);
        reject(err);
      });
    } catch (error) {
      console.error('下载文件时出错:', error);
    }
  });
};
/**
 * 用 FFmpeg 命令合并视频（无损模式）
 */
export const mergeVideosByCommand = async ({
  list = [],
  saveDir = '',
  filename = '',
}) => {
  const rootDir = process.cwd();
  // 1. 创建临时文件列表
  const listPath = join(rootDir, saveDir, 'video_list.txt');
  const inputPaths = list.map((item) => join(rootDir, saveDir, item));
  const outputPath = join(rootDir, saveDir, `${filename}.mp4`);
  const listContent = inputPaths.map((p) => `file '${p}'`).join('\n');
  writeFileSync(listPath, listContent);

  // 2. 拼接 FFmpeg 命令
  const command = [
    'ffmpeg',
    '-f concat', // 启用 concat 协议
    '-safe 0', // 允许文件列表中的绝对路径
    `-i ${listPath}`, // 输入文件列表
    '-c copy', // 无损复制
    `-y ${outputPath}`, // -y：覆盖现有文件
  ].join(' ');
  execSync(command);

  // 清理临时文件
  unlinkSync(listPath);
  inputPaths.forEach((path) => {
    unlinkSync(path);
  });
  console.log('合并成功！输出路径：', outputPath);
};
export const downloadTsFile = async ({
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
  const len = list.length;
  const downloadResults = [];
  for (let index = 0; index < len; index++) {
    const pathname = list[index];
    const url = pathname.startsWith('http')
      ? pathname
      : `${downloadPath}${pathname}`;
    const name = pathname.split('/').pop();
    const limit = len;
    if (index < limit) {
      console.log(`"${filename}"文件 开始下载第${index + 1}个ts文件`);
      const res = await downloadStreamFile(url, `${saveDir}/${name}`).catch(
        () => {
          console.error(`下载 ${name} 失败, 跳过该文件`);
          return Promise.resolve(0);
        },
      );
      if (res) {
        downloadResults.push(pathname);
      }
    }
  }
  mergeVideosByCommand({ list: downloadResults, saveDir, filename });
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
    await downloadTsFile({ list, filename, saveDir, downloadPath });
  }
};
