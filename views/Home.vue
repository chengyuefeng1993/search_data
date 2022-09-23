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
  background-image: url("https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2F202076ae02fc86ce5506e9ce9c5e497616e31a47.jpg&refer=http%3A%2F%2Fi0.hdslb.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1663386701&t=a658692b7120797aaaccdee09993f854");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  justify-content: center;
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
