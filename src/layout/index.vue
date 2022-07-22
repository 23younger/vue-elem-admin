<template>
  <div class="common-layout">
    <el-container>
      <el-aside>
        <Asider />
      </el-aside>
      <el-container>
        <el-header>header</el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import {} from "vue";
import Asider from "./components/aside/index.vue";
</script>

<style scoped lang="less"></style>
