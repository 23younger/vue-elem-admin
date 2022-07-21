import { isNullOrUndef } from "@/utils/is";

export function reqResolve(config) {
  // 防止缓存，给get请求添加时间
  if (config.method === "get") {
    config.params = { ...config.params, t: new Date().getTime() };
  }

  return config;
}

export function reqReject(error) {
  return Promise.reject(error);
}

export function resResolve(response) {
  return response?.data;
}

export function resReject(error) {
  return Promise.resolve(error);
}
