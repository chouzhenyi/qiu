import { request } from "../common/request";

enum api {
  getUserInfo = "/api/user",
}

export const getUserInfo = () => request({ url: api.getUserInfo });
