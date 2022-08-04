<template>
  <n-card>
    <BasicTable :ref="tableRef" :columns="columns" :row-key="(row) => row.id" :request="fetchUserInfo">
      <template #table-cus-operations>
        <n-button type="primary">
          <template #icon>
            <icon-carbon-add />
          </template>
          新建
        </n-button>
      </template>
    </BasicTable>
  </n-card>
</template>

<script setup>
import { ref } from "vue";
import BasicTable from "@/components/Table/index.vue";
import { fetchUserInfo } from "@/apis/user.js";
const columns = [
  {
    title: "id",
    key: "id",
  },
  {
    title: "名称",
    key: "name",
  },
  {
    title: "年龄",
    key: "age",
  },
];

const tableRef = ref(null);
</script>

<style lang="less">
.n-button .n-button__icon {
  margin-right: 0;
}
</style>
