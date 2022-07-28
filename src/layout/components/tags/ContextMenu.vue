<template>
  <n-dropdown :options="options" :x="x" :y="y" @clickoutside="handleHideDropdown" @select="handleSelect"> </n-dropdown>
</template>

<script setup name="ContextMenu">
import { useTagsStore } from "@/store/modules/tags";
import renderIcon from "@/utils/icon";
import { useRoute, useRouter } from "vue-router";

const props = defineProps({
  currentPath: {
    type: String,
    default: "",
  },
  x: {
    type: Number,
    default: 0,
  },
  y: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(["hideContextMenu"]);

const tagsStore = useTagsStore();

const options = computed(() => [
  {
    label: "重新加载",
    key: "reload",
    disabled: props.currentPath !== tagsStore.activeTag,
    icon: renderIcon("mdi:refresh", { size: 14 }),
  },
  {
    label: "关闭",
    key: "close",
    disabled: tagsStore.tags.length <= 1,
    icon: renderIcon("mdi:close", { size: 14 }),
  },
  {
    label: "关闭其他",
    key: "close-other",
    disabled: tagsStore.tags.length <= 1,
    icon: renderIcon("mdi:arrow-expand-horizontal", { size: 14 }),
  },
  {
    label: "关闭左侧",
    key: "close-left",
    disabled: tagsStore.tags.length <= 1 || props.currentPath === tagsStore.tags[0].path,
    icon: renderIcon("mdi:arrow-expand-left", { size: 14 }),
  },
  {
    label: "关闭右侧",
    key: "close-right",
    disabled: tagsStore.tags.length <= 1 || props.currentPath === tagsStore.tags[tagsStore.tags.length - 1].path,
    icon: renderIcon("mdi:arrow-expand-right", { size: 14 }),
  },
]);

const router = useRouter();
const route = useRoute();

const actionMap = new Map([
  [
    "reload",
    () => {
      router.push(route.path);
    },
  ],
  [
    "close",
    () => {
      tagsStore.removeTag(props.currentPath);
    },
  ],
  [
    "close-other",
    () => {
      tagsStore.removeOther(props.currentPath);
    },
  ],
  [
    "close-left",
    () => {
      tagsStore.removeLeft(props.currentPath);
    },
  ],
  [
    "close-right",
    () => {
      tagsStore.removeRight(props.currentPath);
    },
  ],
]);

const handleHideDropdown = () => {
  console.log("handleHideDropdown");
  emit("hideContextMenu");
};

const handleSelect = (key, options) => {
  const actionFn = actionMap.get(key);
  actionFn && actionFn();
  handleHideDropdown();
};
</script>

<style scoped lang="less"></style>
