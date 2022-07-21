import { defAxios as request } from "../utils/http";

export function getUser(data) {
  return request({
    url: "/userInfo",
    method: "post",
    data,
  });
}
