import { defineStore } from "pinia";
import { fetchUserInfo, fetchUserAccess } from "@/apis/user";

export const useUserStore = defineStore("user", {
  state() {
    return {
      userInfo: {},
      userAccessMenu: [],
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
        const { data, code, message } = await fetchUserInfo();
        this.userInfo = data;
        return Promise.resolve();
      } catch (error) {
        return Promise.reject();
      }
    },
    async getUserAccess() {
      try {
        const { data, code, message } = await fetchUserAccess();
        this.userAccessMenu = data;
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
