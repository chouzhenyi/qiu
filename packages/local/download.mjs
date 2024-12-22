import axios from "axios";
import { existsSync, mkdirSync, createWriteStream, exists } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import shell from "shelljs";
import { EventEmitter } from "events";

const __dirname = dirname(fileURLToPath(import.meta.url));

const videoLoadedEmitter = new EventEmitter();
videoLoadedEmitter.on("process", ({ dirName, count }) => {
  const outputFileList = new Array(count).fill(count).map((item, index) => {
    const filename = `output_${index}.mp4`;
    const outputFile = join(dirName, filename);
    return {
      filename,
      outputFile,
      exists: existsSync(outputFile),
    };
  });
  const notLoadedCount = outputFileList.filter((e) => !e.exists).length;
  console.log("outputFileList", outputFileList);
  if (!notLoadedCount) {
    shell.cd(dirName);
    const commandStr = `ffmpeg -i "concat:${outputFileList
      .map(({ filename }) => filename)
      .join("|")}" -c copy output_video.mp4`;
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
  console.log(`下载进度:${count - notLoadedCount}/${count}`);
});

const downloadTsFile = async ({ origin, tsUrl, fileDirName, filename }) => {
  const downloadUrl = join(__dirname, fileDirName, filename);
  const res = await axios.get(origin + tsUrl, { responseType: "stream" });
  const stream = createWriteStream(downloadUrl);
  res.data.pipe(stream);
  return new Promise((resolve, reject) => {
    stream
      .on("finish", () => {
        resolve({ filename });
      })
      .on("error", (err) => {
        resolve(err);
      });
  });
};

const batchDownloadFile = async ({
  origin,
  dirName,
  fileDirName,
  list,
  index,
  count,
}) => {
  const results = await Promise.all(
    list.map(async ({ tsUrl, filename }) => {
      return await downloadTsFile({
        origin,
        tsUrl,
        fileDirName,
        filename,
      }).catch(() => ({ filename: "" }));
    })
  );
  const filenameList = results.filter(({ filename }) => !!filename);
  shell.cd(dirName);
  const commandStr = `ffmpeg -i "concat:${filenameList
    .map(({ filename }) => filename)
    .join("|")}" -c copy output_${index}.mp4`;
  shell.exec(commandStr, { silent: true });
  videoLoadedEmitter.emit("process", { dirName, count });
};

export const downloadVideo = async (url, filename) => {
  const { data } = await axios.get(url);
  const list = data.split(/\n/).filter((str) => {
    return !/^#/.test(str) && !!str;
  });
  const len = list.length;
  if (len) {
    const fileDirName = filename + Math.ceil(Math.random() * 1e4);
    const dirName = join(__dirname, fileDirName);
    if (!existsSync(dirName)) {
      mkdirSync(dirName);
    }

    const { origin } = new URL(url);
    const stepLen = 10;
    const fileList = list.reduce((prev, tsUrl) => {
      const prevLen = prev.length;
      const [filename] = tsUrl.match(/\w{1,}\.ts/g);
      const item = { filename, tsUrl };
      if (prevLen) {
        if (prev[prevLen - 1].length < stepLen) {
          prev[prevLen - 1].push(item);
          return prev;
        } else {
          return [...prev, [item]];
        }
      }
      return [[item]];
    }, []);
    fileList.forEach((fileElList, index) => {
      batchDownloadFile({
        origin,
        dirName,
        fileDirName,
        list: fileElList,
        index,
        count: Math.ceil(len / stepLen),
      });
    });
  }
};

const url = "https://vod1.ttbfp2.com/20241219/gYBXztnn/1000kb/hls/index.m3u8";
downloadVideo(url, "健身房奇遇记");
