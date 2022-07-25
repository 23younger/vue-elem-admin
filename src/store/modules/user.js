import { defineStore } from "pinia";
import { getUser } from "@/apis/user";

export const useUserStore = defineStore("user", {
  state() {
    return {
      userInfo: {},
    };
  },
  getters: {
    userId() {
      return this.userInfo?.id;
    },
  },
  actions: {
    async getUserInfo() {
      try {
        const { data, code, message } = await getUser();
        this.userInfo = data;
        return Promise.resolve();
      } catch (error) {
        return Promise.reject();
      }
    },
    setUserInfo(data = {}) {
      this.userInfo = { ...this.userInfo, ...data };
    },
  },
});
