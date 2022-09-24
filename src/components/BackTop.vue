<template>
  <div class="back-to-top" ref="backTop" @click="mainStore.backToTop">
    <span style="font-size: 14px;font-weight: bold">返回顶部</span>
  </div>
</template>
<script setup lang="ts">

import {onMounted, ref} from "vue";
import {useMainStore} from "../../stores";

const backTop = ref()
const mainStore = useMainStore()

// const backToTop = () => {
//   document.body.scrollTop = 0
//   document.documentElement.scrollTop = 0
// }
onMounted(() => {
  window.onscroll = () => {
    let res = document.body.scrollTop || document.documentElement.scrollTop;
    if (res >= 150) {
      backTop.value.style.display = 'flex';
    } else {
      backTop.value.style.display = 'none';

    }
  }
})

</script>
<style scoped>
.back-to-top {
  position: fixed;
  width: 40px;
  height: 50px;
  right: 10px;
  bottom: 30px;
  /*border: 1px solid #616367;*/
  background-color: #409EFF;
  border-radius: 5px;
  padding: 3px 5px;
  text-align: center;
  display: none;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  box-shadow: var(--el-box-shadow);
  color: #dcdfe6;
}
</style>
