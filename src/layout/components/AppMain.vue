<template>
  <router-view v-slot="{ Component, route }">
    <transition name="fade-slide" mode="out-in" appear>
      <keep-alive :include="keepAliveRouteNames">
        <component :is="Component" :key="route.name"></component>
      </keep-alive>
    </transition>
  </router-view>
</template>

<script setup name="AppMain">
import { computed } from "vue";

const router = useRouter();
const allRoutes = router.getRoutes();
const keepAliveRouteNames = computed(() => {
  return allRoutes.filter((route) => route.meta?.keepAlive).map((route) => route.name);
});
</script>

<style scoped lang="less"></style>
