<template>
  <n-layout has-sider h-full>
    <n-layout-sider
      bordered
      show-trigger
      collapse-mode="width"
      :collapse-width="64"
      :width="220"
      :native-scrollbar="false"
      :collapsed="appStore.collapsed"
      @collapse="appStore.switchCollapsed()"
      @expand="appStore.switchCollapsed()"
    >
      <SideBar />
    </n-layout-sider>
    <n-layout>
      <n-layout-header bg-white border-b bc-eee h-60> </n-layout-header>
      <n-layout :style="{ height: `calc(100% - 60px)` }">
        <Tags />
        <AppMain />
      </n-layout>
    </n-layout>
  </n-layout>
</template>

<script setup>
import {} from "vue";
import SideBar from "./components/sideBar/index.vue";
import AppMain from "./components/AppMain.vue";
import Tags from "./components/tags/index.vue";
import { useAppStore } from "@/store/modules/app";

const appStore = useAppStore();
</script>

<style scoped lang="less"></style>
