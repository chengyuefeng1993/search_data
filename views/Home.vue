<template>
  <div class="home">
    <div class="change">
      <div id="btn1" class="route-btn" @click="toRoute('/search/label')">数 据</div>
      <div id="btn2" class="route-btn" @click="toRoute('/search/review')">回 查</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {useRouter} from "vue-router";

const router = useRouter()
const toRoute = (url:string) => {
  router.push(url)
}
</script>
<style scoped>
.home {
  display: flex;
  width: 100vw;
  height: 100vh;
  background-image: url(https://bing.biturl.top/?resolution=1920&format=image&index=0&mkt=zh-CN);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  justify-content: center;
  /*background-repeat:repeat;*/
  /*background-attachment:fixed;*/
  /*background-position:50% 50%;*/
}

.change {
  position: fixed;
  top: 50px;
}


#btn1 {
  translate: -50%;
}

#btn2 {
  translate: 50%;
}

.route-btn {
  color: #fff;
  cursor: pointer;
  text-align: center;
  display: inline-block;
  font-size: 18px;
  width: 100px;
  height: 40px;
  line-height: 40px;
  font-family: 'LXGW WenKai GB Regular',fangsong;
  background-image: linear-gradient(to right, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
  border-radius: 10px;
  background-size: 400%;
  z-index: 1;
}

.route-btn::before {
  content: '';
  position: absolute;
  top: -5px;
  bottom: -5px;
  left: -5px;
  right: -5px;
  background-image: linear-gradient(to right, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
  border-radius: 10px;
  background-size: 400%;
  z-index: -1;
  filter: blur(20px);
}

.route-btn:hover::before {
  animation: sun 8s infinite;
}

.route-btn:hover {
  animation: sun 8s infinite;
}

@keyframes sun {
  100% {
    background-position: -400% 0;
  }
}
</style>
