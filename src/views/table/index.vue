<template>
  <n-card>
    <BasicTable>
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
import {} from "vue";
import BasicTable from "@/components/Table/index.vue";
</script>

<style lang="less">
.n-button .n-button__icon {
  margin-right: 0;
}
</style>
