<template>
  <n-menu
    accordion
    :indent="18"
    :collapsed-icon-size="22"
    :collapsed-width="64"
    :options="menuOptions"
    @update:value="changeMenuVal"
  ></n-menu>
</template>

<script setup>
import renderIcon from "@/utils/icon";
import { useUserStore } from "@/store/modules/user";
import { routes } from "@/route/routes";
import { isExternal } from "@/utils/is";
const userStore = useUserStore();
const router = useRouter();
const { userAccessMenu: menus } = userStore;
console.log("menus", menus, routes);
const resolvePath = (basePath, path) => {
  if (isExternal(path)) return path;
  return basePath + path;
};
const getMenuItem = function (route, basePath = "") {
  let menuItem = {
    label: (route.meta && route.meta.title) || route.name,
    key: route.name,
    path: resolvePath(basePath, route.path),
    icon: route.meta?.icon ? renderIcon(route.meta.icon, { size: 16 }) : renderIcon("mdi:circle-outline", { size: 8 }),
  };
  if (route.children && route.children.length) {
    basePath = menuItem.path;
    menuItem.children = route.children.map((v) => {
      return getMenuItem(v, basePath);
    });
  }
  return menuItem;
};
const menuOptions = routes
  .filter((v) => !v.isHidden)
  .map(($v) => {
    return getMenuItem($v);
  });

const changeMenuVal = (val, item) => {
  console.log(val, item);
  router.push({ path: item.path });
};
</script>

<style scoped lang="less"></style>
