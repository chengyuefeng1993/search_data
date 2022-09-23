<template>
  <div class="navbar">
    <el-menu mode="horizontal" router :default-active="mainStore.routeUrl">
      <el-menu-item index="home" route="/">Home</el-menu-item>
      <el-menu-item index="label" route="/search/label">数据</el-menu-item>
      <el-menu-item index="review" route="/search/review">回查</el-menu-item>
    </el-menu>
  </div>
</template>
<script setup lang="ts">
import {useMainStore} from "../../stores";

const mainStore = useMainStore()
</script>
<style scoped>
</style>
