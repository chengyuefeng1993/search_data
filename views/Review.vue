<template>
  <KeepAlive>
    <div class="review">
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

          <ReviewView/>
        </el-tab-pane>
      </el-tabs>
    </div>
  </KeepAlive>
</template>
<script setup lang="ts">
import {ref} from "vue";
import ReviewView from "../src/components/ReviewView.vue";

let tabIndex = 1
const editableTabsValue = ref('1')
const editableTabs = ref([
  {
    title: `回查`,
    name: '1',
    num: tabIndex
  }
])

const handleTabsEdit = (targetName: string, action: 'remove' | 'add') => {
  if (action === 'add') {
    const newTabName = `${++tabIndex}`
    editableTabs.value.push({
      title: `回查`,
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
