<template>
  <n-scrollbar w-100 x-scrollable class="cus-scrollbar h-50" bgc-eee>
    <n-tag
      v-for="tag in tagsStore.tags"
      :key="tag.name"
      class="px-15 mx-5 cursor-pointer hover:color-primary"
      :closable="true"
      @click="handleTagClick(tag.path)"
      @close.stop="handleTagClose(tag.path)"
      @contextmenu.prevent="handleContextMenu($event, tag)"
    >
      {{ tag.title }}
    </n-tag>
  </n-scrollbar>

  <ContextMenu
    :show="contextMenuOptionss.show"
    :x="contextMenuOptionss.x"
    :y="contextMenuOptionss.y"
    :current-path="contextMenuOptionss.currentPath"
    @hide-context-menu="hideContextMenu"
  />
</template>

<script setup name="Tags">
import { reactive, watch } from "vue";
import { useTagsStore } from "@/store/modules/tags";
import ContextMenu from "./ContextMenu.vue";

const route = useRoute();
const router = useRouter();
const tagsStore = useTagsStore();

const contextMenuOptionss = reactive({
  show: false,
  x: 0,
  y: 0,
  currentPath: "",
});

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

const hideContextMenu = () => {
  contextMenuOptionss.show = false;
};

const showContextMenu = () => {
  contextMenuOptionss.show = true;
};

const setContextMenu = (x, y, currentPath) => {
  Object.assign(contextMenuOptionss, { x, y, currentPath });
};

/**
 * * 右键点击出现菜单
 */
const handleContextMenu = async (e, tag) => {
  console.log(e, tag);
  const { clientX, clientY } = e;
  hideContextMenu();
  setContextMenu(clientX, clientY, tag.path);
  await nextTick();
  showContextMenu();
};
</script>

<style lang="less">
.cus-scrollbar > .n-scrollbar-container > .n-scrollbar-content {
  display: flex;
  flex-wrap: nowrap;
  height: 50px;
}
</style>
