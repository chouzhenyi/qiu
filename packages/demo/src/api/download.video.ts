import { request } from "../common/request";

const prefix = "http://localhost:3000/";

enum api {
  downloadVideo = `${prefix}download/video`,
}

export const downloadVideo = (data: { url: string; name: string }) =>
  request({ url: api.downloadVideo, method: "post", data });
