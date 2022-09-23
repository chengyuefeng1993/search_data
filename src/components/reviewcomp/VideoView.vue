<template>
  <div class="video-view" :style="{borderColor:props.item.reviewUser==null?'red':'green'}">
    <div class="caption">
      <el-tooltip placement="top">
        <template #content>
          {{ props.item.caption }}
        </template>
        <span class="caption-text">{{ props.item.caption }}</span>
      </el-tooltip>
    </div>
    <div class="img-view" v-show="props.imgIsShow">
      <el-image :src="poster(props.item.name)" fit="contain" hide-on-click-modal lazy
                :preview-src-list="imageList(props.item.name,props.item?.frameIdList.length)"
                preview-teleported style="width: 200px;height: 300px;"/>
    </div>
    <div class="info">
      <p><b style="font-size: 16px">{{ props.item.defaultCategory }}</b></p>
      <el-space :size="25">
        <span class="search-btn" @click="toVideo(props.item.name)">dataId:{{ props.item.dataId }}</span>
        <span class="search-btn" @click="toBaiDu(props.item.defaultCategory)">百度</span>
      </el-space>
      <br/>
      <el-space :size="25">
        <span class="search-btn" @click="toKwai(props.item.defaultCategory)">快手</span>
        <span class="search-btn" @click="toKwaiInner(props.item.defaultCategory)">快手内部</span>
      </el-space>
    </div>
    <el-divider style="margin: 5px 0"/>
    <div class="history-list">
      <p v-for="i in historyList">{{ i }}</p>
    </div>
  </div>
</template>
<script setup lang="ts">

const props = defineProps(['item','historyList','imgIsShow'])

const toVideo = (photoId: string) => {
  window.open(`https://ml.corp.kuaishou.com/media/api/video/trans?photoId=${photoId}`)
}
const toBaiDu = (q: string) => {
  window.open(`https://www.baidu.com/s?wd=${q}`)
}
const toKwai = (q: string) => {
  window.open(`https://www.kuaishou.com/search/video?searchKey=${q}`)
}
const toKwaiInner = (q: string) => {
  window.open(`https://ml.corp.kuaishou.com/v2/search/online-search?query=${q}`)
}
const toInnerUrl = (url: string) => {
  window.open(url)
}

const poster = (photoId: string) => `https://api.chengyuefeng.fun/getimage?photoid=${photoId}&frameid=h`
const imageList = (photoId: string, num: number) => {
  let list = [`https://api.chengyuefeng.fun/getimage?photoid=${photoId}&frameid=h`]
  for (let i = 0; i < num; i++) {
    let url = `https://api.chengyuefeng.fun/getimage?photoid=${photoId}&frameid=${i}`
    list.push(url)
  }
  return list
}
</script>
<style scoped>
.video-view {
  width: 280px;
  border-width: 1px;
  border-style: solid;
  padding: 5px;
  text-align: center;
  font-size: 14px;
  box-shadow: var(--el-box-shadow-light);
}

.caption {
  height: 30px;
}

.caption-text {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}

.search-btn {
  cursor: pointer;
  color: #616367;
}

.search-btn:hover {
  color: #03a9f4;
}
</style>
