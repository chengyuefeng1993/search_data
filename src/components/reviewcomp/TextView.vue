<template>
  <div class="text-view" :style="{borderColor:props.item.reviewUser == null ? 'red':'green'}">
    <div class="caption">
      <b v-html="props.item.caption" style="font-size: 16px"></b>
    </div>
    <div class="info">
      <span>dataId:{{props.item.dataId}}</span><br/>
      <span>{{props.item.defaultCategory}}</span>
    </div>
    <el-divider style="margin: 5px 0"/>
    <div class="history-list">
      <p v-for="i in props.historyList">{{i}}</p>
    </div>
  </div>
</template>
<script setup lang="ts">

const props = defineProps(['item','historyList'])
</script>
<style scoped>
.text-view {
  width: 250px;
  text-align: center;
  font-size: 14px;
  border-width: 1px;
  border-style: solid;
  padding: 5px;
  box-shadow: var(--el-box-shadow-light);
}
</style>
