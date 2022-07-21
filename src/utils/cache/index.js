import { createStorage } from "./storage";

const prefixKey = "vue_ele_admin";

export const createLocalStorage = function (option = {}) {
  return createStorage({
    prefixKey: option.prefixKey || "",
    storage: localStorage,
  });
};

export const createSessionStorage = function (option = {}) {
  return createStorage({
    prefixKey: option.prefixKey || "",
    storage: sessionStorage,
  });
};

export const lStorage = createLocalStorage({ prefixKey });

export const sStorage = createSessionStorage({ prefixKey });
