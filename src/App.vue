<template>
  <AppProvider>
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </AppProvider>
</template>

<script setup>
import AppProvider from "@/components/AppProvider/index.vue";
import { useUserStore } from "./store/modules/user";
const userStore = useUserStore();
userStore.getUserInfo();
userStore.getUserAccess();
</script>

<style scoped lang="less"></style>
