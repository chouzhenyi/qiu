const request = require("request");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const shell = require("shelljs");

const download = async (url) => {
  const baseUrl = "https://vod1.ttbfp2.com/20241219/gYBXztnn/1000kb/hls/";
  const downloadUrl = path.join(__dirname, url);
  const res = await axios.get(baseUrl + url, { responseType: "stream" });
  res.data.pipe(fs.createWriteStream(downloadUrl));
};

// download("mSNaact6.ts");
// download("5RrgXCnM.ts");

shell.exec(`ffmpeg -i "concat:mSNaact6.ts|5RrgXCnM.ts" -c copy output.mp4`);
