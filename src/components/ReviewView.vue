<template>
  <div class="review">
    <div class="review-bar">
      <el-space wrap>
        <el-date-picker v-model="data.time" type="datetimerange" :shortcuts="shortcuts"
                        style="width: 360px"/>
        <el-select v-model="data.stageName" style="width: 75px">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
        <el-input placeholder="用户名" v-model="data.userName" style="width: 160px"/>
        <el-input placeholder="dataId" v-model="data.dataId" style="width: 90px" clearable/>
        <el-input placeholder="页数" v-model.number="data.pageNum" style="width: 150px" :maxlength="4" clearable
                  type="number" :min="1">
          <template #append>
            <span>页</span>
          </template>
        </el-input>
        <el-input v-model="data.id" :maxlength="5" style="width: 150px" clearable
                  @keydown.enter="onSearch" placeholder="包ID">
          <template #append>
            <el-button @click="onSearch" :loading="data.isLoading">查询</el-button>
          </template>
        </el-input>
        <el-switch
          v-model="data.isFilter"
          style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
          active-text="开启过滤"
          inactive-text="关闭过滤"
          v-show="data.reviewList.totalSize > 0"
        />
        <el-switch
          v-model="data.imgIsShow"
          style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
          active-text="显示图片"
          inactive-text="隐藏图片"
          v-show="data.reviewList.dataType === 'video'"
        />
      </el-space>
    </div>
    <el-divider style="margin: 0"/>
    <transition name=".el-fade-in">
      <div class="review-main" v-loading="data.isLoading">
        <div v-show="view != null">
          <el-space wrap :size="20" alignment="start">
            <component :is="view" v-for="item in reviewData" :item="item"
                       :historyList="item.answers[0].historyList" :imgIsShow="data.imgIsShow"></component>
          </el-space>
          <div class="pager">
            <el-pagination :total="total" layout="total,prev,pager,next,jumper,sizes"
                           v-model:current-page="data.pageNum" v-model:page-size="data.pageSize"
                           :page-sizes="pageSizes" background v-show="total !== 0"
                           @current-change="pageNumChange" @size-change="pageSizeChange" :hide-on-single-page="true"/>
          </div>
        </div>
        <el-empty :image-size="500" v-show="isEmpty"/>
      </div>
    </transition>
  </div>
</template>
<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import dayjs from "dayjs";
import {Review} from "../../stores/types";
import VideoView from './reviewcomp/VideoView.vue'
import TextView from './reviewcomp/TextView.vue'
import {useMainStore} from "../../stores";
import {ElMessage, ElNotification} from "element-plus";
import axios, {Canceler} from "axios";

axios.defaults.timeout = 200000
axios.interceptors.response.use(resp => {
  return resp
}, error => {
  if (error.message.includes('timeout')) {
    error.message = 'timeOutError'
    console.log('请求超时！' + new Date())
    return Promise.reject(error)
  }
  return Promise.reject(error)
})
const mainStore = useMainStore()

let data = ref({
  id: '' as string,
  time: [
    dayjs().startOf('day').toDate(),
    dayjs().add(1, 'day').startOf('day').toDate()
  ] as [Date, Date],
  stageName: 'allReview' as string,
  reviewList: {} as Review,
  dataId: '' as string,
  userName: '' as string,
  pageNum: 1 as number,
  pageSize: 30 as number,
  isFilter: false as boolean,
  isLoading: false as boolean,
  imgIsShow: false as boolean,
})

const view = computed(() => {
  if (data.value.reviewList.dataType == 'text') {
    return TextView
  } else if (data.value.reviewList.dataType == 'video') {
    return VideoView
  }
})
const pageSizes = [10, 30, 50, 100, 200, 500, 1000]
const reviewData = computed(() => {
  if (data.value.isFilter) {
    return data.value.reviewList.data?.filter((a) => a?.reviewUser == null)
  } else {
    return data.value.reviewList.data
  }
})
const total = computed(() => {
  if (Object.getOwnPropertyNames(data.value.reviewList).length > 0) {
    return data.value.reviewList.totalSize
  } else {
    return 0
  }
})

const isEmpty = computed(() => {
  return !(data.value.reviewList.totalSize > 0)
})

const onSearch = () => {
  if (data.value.id != '') {

    data.value.isLoading = true
    getReviewData()
  } else {
    ElMessage({
      message: '请输入ID！',
      type: 'error',
      duration: 1500,
    })
  }
}

const reviewUrl = 'https://review-search-bhkbqhmaps.cn-beijing.fcapp.run'

const getReviewData = async () => {
  await axios.get(reviewUrl, {
    params: {
      sourceid: data.value.id,
      stagename: data.value.stageName,
      tmstart: dayjs(data.value.time[0]).valueOf(),
      tmstop: dayjs(data.value.time[1]).valueOf(),
      username: data.value.userName,
      dataid: data.value.dataId,
      pagenum: data.value.pageNum,
      pagesize: data.value.pageSize,
    }
  }).then(r => {
    if (r.data.code == 200) {
      data.value.reviewList = r.data.result
    } else {
      data.value.reviewList = {} as Review
    }
    data.value.isLoading = false
  }).catch(err => {
    if (err.message == 'timeOutError') {
      ElNotification({
        title: '请求超时！',
        message: '数据请求超时，请重新发起请求！',
        duration: 0,
        type: 'error'
      })
      data.value.isLoading = false
    }
  })
}

const pageNumChange = (num: number) => {
  data.value.pageNum = num
  onSearch()
  mainStore.backToTop()
}

const pageSizeChange = () => {
  data.value.pageNum = 1
  window.localStorage.setItem('pageSize', data.value.pageSize.toString())
  onSearch()
  mainStore.backToTop()
}

const options = [
  {
    label: '标注',
    value: 'label'
  },
  {
    label: '一审',
    value: 'review'
  },
  {
    label: '全部',
    value: 'allReview'
  }
]

const shortcuts = [
  {
    text: '前一天',
    onClick: () => {
      data.value.time = [
        dayjs(data.value.time[0]).subtract(1, 'day').toDate(),
        dayjs(data.value.time[1]).subtract(1, 'day').toDate()
      ]
    }
  },
  {
    text: '今天',
    onClick: () => {
      data.value.time = [
        dayjs().startOf('day').toDate(),
        dayjs().add(1, 'day').startOf('day').toDate()
      ]
    }
  },
  {
    text: '后一天',
    onClick: () => {
      data.value.time = [
        dayjs(data.value.time[0]).add(1, 'day').toDate(),
        dayjs(data.value.time[1]).add(1, 'day').toDate()
      ]
    }
  },
  {
    text: '半个月',
    onClick: () => {
      data.value.time = [
        dayjs().subtract(15, 'day').startOf('day').toDate(),
        dayjs().endOf('day').toDate()
      ]
    }
  },
  {
    text: '一个月',
    onClick: () => {
      data.value.time = [
        dayjs().subtract(1, 'month').startOf('day').toDate(),
        dayjs().endOf('day').toDate()
      ]
    }
  }
]

onMounted(() => {
  let pageSize = window.localStorage.getItem('pageSize')
  if (pageSize != null) {
    data.value.pageSize = Number(pageSize)
  }
})
</script>
<style scoped>
.review-bar {
  padding: 10px;
}

.review-main {
  padding: 10px;
}

.pager {
  display: flex;
  width: 100%;
  justify-content: center;
  margin: 20px 0;
}
</style>
