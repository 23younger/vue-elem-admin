import axios from "axios";
import { reqResolve, reqReject, resResolve, resReject } from "./intercepter";

export function createAxios(options = {}) {
  console.log(import.meta.env);
  const defaultOptions = {
    baseURL: import.meta.env.VITE_APP_BASE_URL,
    timeout: 15000,
  };
  const service = axios.create({
    ...defaultOptions,
    ...options,
  });
  service.interceptors.request.use(reqResolve, reqReject);
  service.interceptors.response.use(resResolve, resReject);
  return service;
}

export const defAxios = createAxios();
