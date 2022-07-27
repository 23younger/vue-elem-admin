<template>
  <n-dropdown :options="options"> </n-dropdown>
</template>

<script setup name="ContextMenu">
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
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

const emit = defineEmits(["update:show"]);

const options = [];
</script>

<style scoped lang="less"></style>
