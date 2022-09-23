<template>
  <transition name=".el-fade-in-linear">
    <div class="tag" v-show="isShow">
      <el-divider>标注数据</el-divider>
      <el-table :data="props.tagList" size="small" border>
        <el-table-column prop="userName" label="姓名" :filters="filters" :filter-method="filterHandler" align="center"/>
        <el-table-column prop="totalMarkedCount" label="审核数量" align="center"/>
        <el-table-column prop="firstAuditCorrectCount" label="质检正确" align="center"/>
        <el-table-column prop="firstAuditTotalCount" label="质检总数" align="center"/>
        <el-table-column label="准确率" align="center">
          <template #default="scope">
          <span
              :style="{color:scope.row.firstAuditCorrectRatio === '100.00%' ? 'green':'red',cursor:'pointer'}"
              @click="toUrl(scope.row.userName)">{{
              scope.row.firstAuditCorrectRatio
            }}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-divider>{{ props.tagList?.length }}</el-divider>
    </div>
  </transition>
</template>
<script setup lang="ts">
import {computed, PropType} from "vue";
import {Tag} from "../../../stores/types";
import {TableColumnCtx} from "element-plus/es/components/table/src/table-column/defaults";

const props = defineProps({
  tagList: {
    type: Array as PropType<Array<Tag>>,
    default: () => {
      return []
    }
  },
  labelId: {
    type: String
  },
  timeStart: {
    type: Number
  },
  timeStop: {
    type: Number
  }
})

const isShow = computed(() => {
  return props.tagList.length > 0
})

const toUrl = (name: string) => {
  window.open(`https://ml.corp.kuaishou.com/label-frontend/allErrorShow?dataSourceId=${props.labelId}&userName=${name}&startTime=${props.timeStart}&endTime=${props.timeStop}`)
}

const filters = computed(() => {
  let list = []
  for (let i = 0; i < props.tagList.length; i++) {
    let item = {text: props.tagList[i].userName, value: props.tagList[i].userName}
    list.push(item)
  }
  return list
})

const filterHandler = (value: string,
                       row: Tag,
                       column: TableColumnCtx<Tag>) => {
  return row.userName === value
}
</script>
<style scoped>
.tag {
  border: 1px solid #dcdfe6;
  box-shadow: var(--el-box-shadow-light);
}
</style>
