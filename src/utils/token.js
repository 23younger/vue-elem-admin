import { lStorage } from "./cache";

const TOKEN_CODE = "access_token";
const DURATION = 6 * 60 * 60;

export function getToken(key) {
  return lStorage.get(key);
}

export function setToken(token) {
  lStorage.setToken(TOKEN_CODE, token, DURATION);
}

export function removeToken() {
  lStorage.remove(TOKEN_CODE);
}
