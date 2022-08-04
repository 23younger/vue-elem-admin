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
    <n-data-table
      v-bind="getBindValues"
      :ref="tableElRef"
      :striped="true"
      @update:page="updatePage"
      @update:page-size="updatePageSize"
    >
    </n-data-table>
  </div>
</template>

<script setup name="BasicTable">
import { ref, defineProps, defineEmits, computed, reactive, unref, toRaw } from "vue";
import { createContextTable } from "./hooks/useTableContext";
import { useLoading } from "./hooks/useLoading";
import { useColumns } from "./hooks/useColumns";
import { useDataSource } from "./hooks/useDataSource";
import { usePagination } from "./hooks/usePagination";

import { basicProps } from "./props";

const props = defineProps({
  ...basicProps,
});

console.log("props", props);

const emits = defineEmits(["fetch-success"]);

const tableElRef = ref(null);
const tableData = ref([]);
const getProps = computed(() => {
  return { ...props };
});

const { getLoading, setLoading } = useLoading(getProps);

const { getPaginationInfo, setPagination } = usePagination(getProps);

const { getDataSourceRef, getDataSource, getRowKey, reload } = useDataSource(
  getProps,
  {
    getPaginationInfo,
    setPagination,
    tableData,
    setLoading,
  },
  emits
);

const { getPageColumns, getColumns, setColumns } = useColumns(getProps);

// 页码切换
const updatePage = (page) => {
  setPagination({ page: page });
  reload();
};

// 分页数量切换
const updatePageSize = (size) => {
  setPagination({ page: 1, pageSize: size });
  reload();
};

// 组装表格信息
const getBindValues = computed(() => {
  const { tableData } = unref(getDataSourceRef);
  return {
    ...unref(getProps),
    column: toRaw(unref(getPageColumns)),
    loading: unref(getLoading),
    rowKey: unref(getRowKey),
    data: tableData,
    remote: true,
  };
});
</script>

<style scoped lang="less"></style>
