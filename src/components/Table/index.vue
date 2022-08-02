<template>
  <div class="table-toolbar flex items-center justify-between">
    <!-- 顶部左侧区域 -->
    <div class="flex items-center table-toolbar-left">
      <slot name="table-cus-operations"></slot>
    </div>

    <!-- 顶部右侧区域 -->
    <div class="flex items-center table-toolbar-right">
      <n-tooltip trigger="hover">
        <template #trigger>
          <icon-ion-refresh text-24 />
        </template>
        刷新
      </n-tooltip>
      <n-tooltip trigger="hover">
        <template #trigger>
          <icon-ic-sharp-density-medium text-24 ml-6 />
        </template>
        密度
      </n-tooltip>
      <n-tooltip trigger="hover">
        <template #trigger>
          <icon-icon-park-outline-config text-24 ml-6 />
        </template>
        列设置
      </n-tooltip>
    </div>
  </div>
  <div class="table-content"></div>
</template>

<script setup name="BasicTable">
import {} from "vue";
import { createContextTable } from "./hooks/useTableContext";
import { useLoading } from "./hooks/useLoading";
</script>

<style scoped lang="less"></style>
