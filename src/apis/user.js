import { defAxios as request } from "../utils/http";

export async function fetchUserInfo(data) {
  return request({
    url: "/userInfo",
    method: "post",
    data,
  });
}

export async function fetchUserAccess(data) {
  return request({
    url: "/userAccess",
    method: "post",
    data,
  });
}
