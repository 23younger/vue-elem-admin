import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state() {
    return {
      collapsed: true,
    };
  },
  actions: {
    switchCollapsed() {
      this.collapsed = !this.collapsed;
    },
  },
});
