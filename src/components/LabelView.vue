<template>
  <div class="label-main" ref="label">
    <div class="label-bar">
      <el-space wrap>
        <el-date-picker v-model="data.labelTime" type="datetimerange" style="width: 360px" :shortcuts="shortcuts"/>
        <el-button-group>
          <el-button @click="backDate">
            <el-icon>
              <ArrowLeftBold/>
            </el-icon>
          </el-button>
          <el-button @click="today">
            <el-icon>
              <View/>
            </el-icon>
          </el-button>
          <el-button @click="fowardDate">
            <el-icon>
              <ArrowRightBold/>
            </el-icon>
          </el-button>
        </el-button-group>
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
            <el-button @click="onSearch" :loading="isLoading">查询</el-button>
          </template>
        </el-input>
      </el-space>
    </div>
    <el-divider style="margin: 0"/>
    <div class="label-view" v-loading="isLoading">
      <div v-show="isShow">
        <StageData :stage-list="data.stageList"/>
        <el-row :gutter="10" style="margin-top: 10px">
          <el-col :xs="24" :sm="16">
            <TagData :tagList="data.tagList" :labelId="data.labelId" :timeStart="timeStart" :timeStop="timeStop"/>
          </el-col>
          <el-col :xs="24" :sm="8">
            <SkipData :skipList="data.skipList" :skipNum="data.skipNum"/>
          </el-col>
        </el-row>
      </div>
      <el-empty :image-size="500" v-show="isEmpty"/>
    </div>
  </div>
</template>
<script setup lang="ts">
import {computed, ref} from 'vue'
import dayjs from "dayjs";
import {ElMessage, ElNotification} from "element-plus";
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

const isShow = computed(() => {
  return Object.getOwnPropertyNames(data.value.stageList).length > 0 || data.value.tagList.length > 0 || data.value.skipList.length > 0;
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

const stageUrl = 'https://stagedata-search-tvqfysxaho.cn-beijing.fcapp.run'
const tagUrl = 'https://tagdata-search-fecerpresb.cn-beijing.fcapp.run'
const skipUrl = 'https://skipdata-search-iqcsnkcpfh.cn-beijing.fcapp.run'

const getStageData = async () => {
  await axios.get(stageUrl, {
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
  }).catch(err => {
    if (err.message == 'timeOutError') {
      ElNotification({
        title: '请求超时！',
        message: '数据请求超时，请重新发起请求！',
        duration: 0,
        type: 'error'
      })
      data.value.isLoadingNum = 4
    }
  })
}

const getTagData = async () => {
  await axios.get(tagUrl, {
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
  }).catch(err => {
    if (err.message == 'timeOutError') {
      ElNotification({
        title: '请求超时！',
        message: '数据请求超时，请重新发起请求！',
        duration: 0,
        type: 'error'
      })
      data.value.isLoadingNum = 4
    }
  })
}

const getSkipData = async () => {
  await axios.get(skipUrl, {
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
  }).catch(err => {
    if (err.message == 'timeOutError') {
      ElNotification({
        title: '请求超时！',
        message: '数据请求超时，请重新发起请求！',
        duration: 0,
        type: 'error'
      })
      data.value.isLoadingNum = 4
    }
  })
}

const isEmpty = computed(() => {
  return !(Object.getOwnPropertyNames(data.value.stageList).length > 0 || data.value.tagList.length > 0 || data.value.skipList.length > 0)
})

// const atFocus = () => {
//   if (Object.getOwnPropertyNames(data.value.stageList).length > 0){
//     onSearch()
//   }
// }


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

const backDate = () => {
  data.value.labelTime = [
    dayjs(data.value.labelTime[0]).subtract(1, 'day').toDate(),
    dayjs(data.value.labelTime[1]).subtract(1, 'day').toDate()
  ]
}
const today = () => {
  data.value.labelTime = [
    dayjs().startOf('day').toDate(),
    dayjs().add(1, 'day').startOf('day').toDate()
  ]
}
const fowardDate = () => {
  data.value.labelTime = [
    dayjs(data.value.labelTime[0]).add(1, 'day').toDate(),
    dayjs(data.value.labelTime[1]).add(1, 'day').toDate()
  ]
}

const shortcuts = [
  // {
  //   text: '前一天',
  //   onClick: () => {
  //     data.value.labelTime = [
  //       dayjs(data.value.labelTime[0]).subtract(1, 'day').toDate(),
  //       dayjs(data.value.labelTime[1]).subtract(1, 'day').toDate()
  //     ]
  //   }
  // },
  // {
  //   text: '今天',
  //   onClick: () => {
  //     data.value.labelTime = [
  //       dayjs().startOf('day').toDate(),
  //       dayjs().add(1, 'day').startOf('day').toDate()
  //     ]
  //   }
  // },
  // {
  //   text: '后一天',
  //   onClick: () => {
  //     data.value.labelTime = [
  //       dayjs(data.value.labelTime[0]).add(1, 'day').toDate(),
  //       dayjs(data.value.labelTime[1]).add(1, 'day').toDate()
  //     ]
  //   }
  // },
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
.label-main {
  outline: none;
}

.label-bar {
  padding: 10px;
}

.label-view {
  padding: 10px;
}
</style>
