import { defAxios as request } from "../utils/http";

export function fetchUserInfo(data) {
  return request({
    url: "/userInfo",
    method: "post",
    data,
  });
}

export function fetchUserAccess(data) {
  return request({
    url: "/userAccess",
    method: "post",
    data,
  });
}
