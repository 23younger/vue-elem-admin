<template>
  <div class="h-50" bgc-eee>
    <n-tag
      v-for="tag in tagsStore.tags"
      :key="tag.name"
      class="px-15 mx-5 cursor-pointer hover:color-primary"
      :closable="true"
      @click="handleTagClick(tag.path)"
      @close.stop="handleTagClose(tag.path)"
      @contextmenu="handleContextMenu($event, tag)"
    >
      {{ tag.title }}
    </n-tag>
  </div>
</template>

<script setup name="Tags">
import { watch } from "vue";
import { useTagsStore } from "@/store/modules/tags";

const route = useRoute();
const router = useRouter();
const tagsStore = useTagsStore();

watch(
  () => route.path,
  () => {
    console.log("route", route);
    const { name, path } = route;
    const title = route.meta?.title;
    tagsStore.addTag({ name, path, title });
  },
  { immediate: true }
);

const handleTagClick = (path) => {
  tagsStore.setActiveTag(path);
  router.push(path);
};

const handleTagClose = (path) => {
  console.log("path", path);
  tagsStore.removeTag(path);
};

/**
 * * 右键点击出现菜单
 */
const handleContextMenu = (e, tag) => {
  console.log(e, tag);
};
</script>

<style scoped lang="less"></style>
