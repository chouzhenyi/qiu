import axios from "axios";
import { existsSync, mkdirSync, createWriteStream } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import shell from "shelljs";
import { EventEmitter } from "events";

const __dirname = dirname(fileURLToPath(import.meta.url));
const videoLoadedEmitter = new EventEmitter();
videoLoadedEmitter.on("process", ({ dirName, loadedList, fileList }) => {
  const loadedCount = loadedList.length;
  const totalCount = fileList.length;
  console.log(`下载进度:${loadedCount}/${totalCount}`);

  if (loadedCount === totalCount) {
    const filenameList = [];
    for (let item of fileList) {
      const { filename } = loadedList.find((e) => e.tsUrl === item.tsUrl) || {};
      if (filename) {
        filenameList.push(filename);
      }
    }
    shell.cd(dirName);
    const commandStr = `ffmpeg -i "concat:${filenameList.join(
      "|"
    )}" -c copy output_video.mp4`;
    shell.exec(commandStr, { silent: true });
    console.log("下载完成, 开始清理缓存文件");
    const preClearList = Array.from(shell.ls());
    preClearList.forEach((file) => {
      if (file !== "output_video.mp4") {
        shell.rm("-rf", file);
      }
    });
    console.log("清理完成！");
  }
});

const downloadTsFile = async ({ origin, tsUrl, fileDirName, filename }) => {
  return new Promise(async (resolve) => {
    const downloadUrl = join(__dirname, fileDirName, filename);
    const [res, err] = await axios
      .get(origin + tsUrl, { responseType: "stream" })
      .then((res) => [res])
      .catch((err) => [null, err]);
    if (err) {
      console.error(`${filename} 文件下载错误`);
    }
    if (res) {
      const stream = createWriteStream(downloadUrl);
      res.data.pipe(stream);
      stream
        .on("finish", () => {
          resolve({ filename, tsUrl });
        })
        .on("error", (err) => {
          resolve({ filename: "", tsUrl });
        });
    } else {
      resolve({ filename: "", tsUrl });
    }
  });
};

const batchDownloadFile = async ({
  origin,
  dirName,
  fileDirName,
  fileList,
}) => {
  const loadedList = [];
  fileList.forEach(async ({ tsUrl, filename }) => {
    await downloadTsFile({
      origin,
      tsUrl,
      fileDirName,
      filename,
    }).then(({ tsUrl, filename = "" }) => {
      loadedList.push({
        tsUrl,
        filename,
      });
      videoLoadedEmitter.emit("process", { dirName, loadedList, fileList });
    });
  });
};

export const downloadVideo = async (url, filename) => {
  const { data } = await axios.get(url);
  const list = data.split(/\n/).filter((str) => {
    return !/^#/.test(str) && !!str;
  });
  //   list.length = 30;
  const len = list.length;
  if (len) {
    const fileDirName = filename + Math.ceil(Math.random() * 1e4);
    const dirName = join(__dirname, fileDirName);
    if (!existsSync(dirName)) {
      mkdirSync(dirName);
    }
    const { origin } = new URL(url);
    const fileList = list.map((tsUrl) => {
      const [filename] = tsUrl.match(/\w{1,}\.ts/g);
      return { filename, tsUrl };
    });
    batchDownloadFile({
      origin,
      dirName,
      fileDirName,
      fileList,
      count: fileList.length,
    });
  }
};

const url = "https://vod1.ttbfp2.com/20241221/1UVpb3P6/1000kb/hls/index.m3u8";
downloadVideo(url, "方格");
