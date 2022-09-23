<template>
  <div :class="className" ref="label">
    <div class="label-bar">
      <el-space wrap>
        <el-date-picker v-model="data.labelTime" type="datetimerange" style="width: 350px" :shortcuts="shortcuts"/>
        <el-select v-model="data.stageName" style="width: 80px">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
        <el-input v-model="data.skipNum" style="width: 170px;">
          <template #prepend>
            <span>暂跳额度：</span>
          </template>
        </el-input>
        <el-input v-model="data.labelId" clearable style="width: 150px;" @keydown.enter="onSearch" placeholder="包ID"
                  :maxlength="5">
          <template #append>
            <el-button @click="onSearch">查询</el-button>
          </template>
        </el-input>
      </el-space>
    </div>
    <el-divider style="margin: 0"/>
    <div class="label-view" v-loading="isLoading">
      <StageData :stage-list="data.stageList"/>
      <el-row :gutter="10" style="margin-top: 10px">
        <el-col :xs="24" :sm="16">
          <TagData :tagList="data.tagList" :labelId="data.labelId" :timeStart="timeStart" :timeStop="timeStop"/>
        </el-col>
        <el-col :xs="24" :sm="8">
          <SkipData :skipList="data.skipList" :skipNum="data.skipNum"/>
        </el-col>
      </el-row>
      <el-empty :image-size="300" v-show="isEmpty"/>
    </div>
  </div>
</template>
<script setup lang="ts">
import {computed, onMounted, ref} from 'vue'
import dayjs from "dayjs";
import {ElMessage} from "element-plus";
import {Skip, Stage, Tag} from "../../stores/types";
import axios from "axios";
import StageData from "./labelcomp/StageData.vue";
import TagData from "./labelcomp/TagData.vue";
import SkipData from "./labelcomp/SkipData.vue";


const props = defineProps(['index'])
const className = `label-view${props.index}`
const label = ref()

let data = ref({
  labelId: '' as string,
  labelTime: [
    dayjs().startOf('day').toDate(),
    dayjs().add(1, 'day').startOf('day').toDate()
  ] as [Date, Date],
  stageName: 'label' as string,
  skipNum: 100 as number,
  stageList: {} as Stage,
  tagList: [] as Array<Tag>,
  skipList: [] as Array<Skip>,
  isLoadingNum: 0 as number
})
const timeStart = computed(() => {
  return dayjs(data.value.labelTime[0]).valueOf()
})
const timeStop = computed(() => {
  return dayjs(data.value.labelTime[1]).valueOf()
})

const isLoading = computed(() => {
  if (data.value.isLoadingNum == 0) {
    return false
  } else if (data.value.isLoadingNum == 1) {
    return true
  } else if (data.value.isLoadingNum == 2) {
    return true
  } else if (data.value.isLoadingNum == 3) {
    return true
  } else if (data.value.isLoadingNum == 4) {
    return false
  }
})

const onSearch = () => {
  if (data.value.labelId != '') {
    data.value.isLoadingNum = 1
    getStageData()
    getTagData()
    getSkipData()
  } else {
    ElMessage({
      message: '请输入ID！',
      type: 'error',
      duration: 1500
    })
  }
}

const getStageData = async () => {
  await axios.get('https://stagedata-stagedata-eaugarneuh.cn-beijing.fcapp.run', {
    params: {
      sourceid: data.value.labelId
    }
  }).then(r => {
    if (r.data.code == 200) {
      data.value.stageList = r.data.result
    } else {
      data.value.stageList = {}
    }
    data.value.isLoadingNum += 1
  })
}

const getTagData = async () => {
  await axios.get('https://tagdata-stagedata-uouqjvmbbx.cn-beijing.fcapp.run', {
    params: {
      sourceid: data.value.labelId,
      stagename: data.value.stageName,
      tmstart: dayjs(data.value.labelTime[0]).valueOf(),
      tmstop: dayjs(data.value.labelTime[1]).valueOf()
    }
  }).then(r => {
    if (r.data.code == 200) {
      let list = r.data.result
      data.value.tagList = list.splice(0, list.length - 2)
    } else {
      data.value.tagList = []
    }
    data.value.isLoadingNum += 1
  })
}

const getSkipData = async () => {
  await axios.get('https://skipdata-stagedata-pvbxlvkfpc.cn-beijing.fcapp.run', {
    params: {
      sourceid: data.value.labelId,
      stagename: data.value.stageName
    }
  }).then(r => {
    if (r.data.code == 200) {
      data.value.skipList = r.data.result
    } else {
      data.value.skipList = []
    }
    data.value.isLoadingNum += 1
  })
}

const isEmpty = computed(() => {
  return !(Object.getOwnPropertyNames(data.value.stageList).length > 0 || data.value.tagList.length > 0 || data.value.skipList.length > 0)
})

onMounted(() => {
  label.value.onfocus = () => {
    console.log(label)
  }
})


const options = [
  {
    label: '标注',
    value: 'label'
  },
  {
    label: '一审',
    value: 'review'
  }
]

const shortcuts = [
  {
    text: '前一天',
    onClick: () => {
      data.value.labelTime = [
        dayjs(data.value.labelTime[0]).subtract(1, 'day').toDate(),
        dayjs(data.value.labelTime[1]).subtract(1, 'day').toDate()
      ]
    }
  },
  {
    text: '今天',
    onClick: () => {
      data.value.labelTime = [
        dayjs().startOf('day').toDate(),
        dayjs().add(1, 'day').startOf('day').toDate()
      ]
    }
  },
  {
    text: '后一天',
    onClick: () => {
      data.value.labelTime = [
        dayjs(data.value.labelTime[0]).add(1, 'day').toDate(),
        dayjs(data.value.labelTime[1]).add(1, 'day').toDate()
      ]
    }
  },
  {
    text: '半个月',
    onClick: () => {
      data.value.labelTime = [
        dayjs().subtract(15, 'day').startOf('day').toDate(),
        dayjs().endOf('day').toDate()
      ]
    }
  },
  {
    text: '一个月',
    onClick: () => {
      data.value.labelTime = [
        dayjs().subtract(1, 'month').startOf('day').toDate(),
        dayjs().endOf('day').toDate()
      ]
    }
  }
]

</script>
<style scoped>
.label-bar {
  padding: 10px;
}

.label-view {
  padding: 10px;
}
</style>
