import { request } from "../common/request";

const prefix = "http://localhost:3000";

enum api {
  chapterList = `${prefix}/text-speech/list`,
  chapterContent = `${prefix}/text-speech/chapter/{code}`,
}

export const ChapterList = (data: {}) => {
  return request({ url: api.chapterList, method: "get", data });
};

export const ChapterContent = (data: { code: number }) => {
  const { code } = data;
  return request({
    url: api.chapterContent.replace("{code}", code.toString()),
    method: "get",
    data,
  });
};
