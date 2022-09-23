<template>
  <KeepAlive>
    <div class="label">
      <el-tabs
          v-model="editableTabsValue"
          type="border-card"
          editable
          class="tabs"
          @edit="handleTabsEdit"
      >
        <el-tab-pane
            v-for="item in editableTabs"
            :key="item.name"
            :label="item.title"
            :name="item.name"
            style="padding: 0"
        >
          <LabelView ref="Label" :index="item.num"/>
        </el-tab-pane>
      </el-tabs>
    </div>
  </KeepAlive>
</template>
<script setup lang="ts">

import {computed, onMounted, ref} from "vue";
import LabelView from "../src/components/LabelView.vue";

const Label = ref()


let tabIndex = 1
const editableTabsValue = ref('1')
const editableTabs = ref([
  {
    title: `数据查询`,
    name: '1',
    num: tabIndex
  }
])

const handleTabsEdit = (targetName: string, action: 'remove' | 'add') => {
  if (action === 'add') {
    const newTabName = `${++tabIndex}`
    editableTabs.value.push({
      title: `数据查询`,
      name: newTabName,
      num: Number(newTabName)
    })
    editableTabsValue.value = newTabName
  } else if (action === 'remove') {
    const tabs = editableTabs.value
    let activeName = editableTabsValue.value
    if (activeName === targetName) {
      tabs.forEach((tab, index) => {
        if (tab.name === targetName) {
          const nextTab = tabs[index + 1] || tabs[index - 1]
          if (nextTab) {
            activeName = nextTab.name
          }
        }
      })
    }

    editableTabsValue.value = activeName
    editableTabs.value = tabs.filter((tab) => tab.name !== targetName)
  }
}
</script>
<style scoped>
.tabs {
  border-bottom: none !important;
}
</style>
