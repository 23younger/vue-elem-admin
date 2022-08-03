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
  <div class="table-content">
    <n-data-table :ref="tableElRef" :striped="true"> </n-data-table>
  </div>
</template>

<script setup name="BasicTable">
import { ref, defineProps, emit } from "vue";
import { createContextTable } from "./hooks/useTableContext";
import { useLoading } from "./hooks/useLoading";
import { useColumns } from "./hooks/useColumns";
import { useDataSource } from "./hooks/useDataSource";
import { usePagination } from "./hooks/usePagination";

import { basicProps } from "./props";

const props = defineProps({
  ...basicProps,
});

const tableElRef = ref(null);
</script>

<style scoped lang="less"></style>
