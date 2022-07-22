<template>
  <el-config-provider :button="buttonConf" :message="messageConf">
    <slot></slot>
  </el-config-provider>
</template>

<script setup name="appProvider">
import { reactive } from "vue";
const buttonConf = reactive({
  autoInsertSpace: true,
});
const messageConf = reactive({
  max: 3,
});
</script>

<style scoped lang="less"></style>
