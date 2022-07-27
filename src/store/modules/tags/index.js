import { defineStore } from "pinia";
import { activeTag, tags, WITHOUT_TAG_PATHS } from "./helpers";
import { sStorage } from "@/utils/cache";
import { router } from "@/router";

export const useTagsStore = defineStore("tags", {
  state() {
    return {
      tags: tags || [], // type tags:tag[]
      activeTag: activeTag || "", // type path:string
    };
  },
  actions: {
    setActiveTag(path) {
      this.activeTag = path;
      sStorage.set("activeTag", path);
    },
    setTags(tags) {
      this.tags = tags;
      sStorage.set("tags", tags);
    },
    addTag(tag = {}) {
      this.setActiveTag(tag.path);
      if (WITHOUT_TAG_PATHS.includes(tag.path) || this.tags.some((item) => tag.path === item.path)) return;
      this.setTags([...this.tags, tag]);
    },
    removeTag(path) {
      console.log(this.tags, this.activeTag);
      if (path === this.activeTag) {
        const activeIndex = this.tags.findIndex((item) => item.path === path);
        console.log(activeIndex);
        if (activeIndex > 0) {
          router.push(this.tags[activeIndex - 1].path);
        } else {
          router.push("/");
        }
      }
      this.setTags(this.tags.filter((item) => item.path !== path));
    },
    removeOther(curPath = this.activeTag) {
      this.setTags(this.tags.filter((item) => item.path === curPath));
      if (curPath !== this.activeTag) {
        router.push(this.tags[this.tags.length - 1].path);
      }
    },
    removerLeft(curPath) {
      const curIndex = this.tags.findIndex((item) => item.path === curPath);
      const filterTags = this.tags.filter((item, index) => index >= curIndex);
      this.setTags(filterTags);
      if (!filterTags.find((item) => item.path === curPath)) {
        router.push(filterTags[filterTags.length - 1].path);
      }
    },
    removeRight(curPath) {
      const curIndex = this.tags.findIndex((item) => item.path === curPath);
      const filterTags = this.tags.filter((item, index) => index <= curIndex);
      this.setTags(filterTags);
      if (!filterTags.find((item) => item.path === curPath)) {
        router.push(filterTags[filterTags.length - 1].path);
      }
    },
  },
});
