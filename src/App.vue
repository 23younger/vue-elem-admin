<template>
  <AppProvider>
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </AppProvider>
</template>

<script setup>
import {} from "vue";
import AppProvider from "./components/common/AppProvider.vue";
</script>

<style scoped lang="less"></style>
