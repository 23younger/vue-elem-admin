<template>
  <n-config-provider wh-full :theme-overrides="themeOverrides">
    <n-loading-bar-provider>
      <n-dialog-provider>
        <n-notification-provider>
          <n-message-provider>
            <slot></slot>
            <NaiveProviderContent />
          </n-message-provider>
        </n-notification-provider>
      </n-dialog-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<script setup name="appProvider">
import { useLoadingBar, useDialog, useMessage, useNotification } from "naive-ui";
import { defineComponent, h } from "vue";
const themeOverrides = {
  common: {
    primaryColor: "#316C72FF",
    primaryColorHover: "#316C72E3",
    primaryColorPressed: "#2B4C59FF",
    primaryColorSuppl: "#316C7263",
  },
};

// 挂载naive组件至全局以供调用
function setupNaiveTools() {
  window.$loadingBar = useLoadingBar();
  window.$dialog = useDialog();
  window.$message = useMessage();
  window.$notification = useNotification();
}

const NaiveProviderContent = defineComponent({
  setup() {
    setupNaiveTools();
  },
  render() {
    return h("div");
  },
});
</script>

<style scoped lang="less"></style>
