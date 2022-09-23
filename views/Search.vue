<template>
  <div class="search">
    <NavBar/>
    <RouterView v-slot="{Component}">
      <KeepAlive>
        <component :is="Component"/>
      </KeepAlive>
    </RouterView>
    <BackTop/>
  </div>
</template>
<script setup lang="ts">
import NavBar from "../src/components/NavBar.vue";
import {useMainStore} from "../stores";
import {useRoute} from "vue-router";
import {onMounted, watch} from "vue";
import BackTop from "../src/components/BackTop.vue";

const mainStore = useMainStore()
const route = useRoute()

onMounted(() => {
  if (route.path == '/home') {
    mainStore.routeUrl = 'home'
  } else if (route.path == '/search/label') {
    mainStore.routeUrl = 'label'
  } else if (route.path == '/search/review') {
    mainStore.routeUrl = 'review'
  }
})

watch(() => route.path, (newId) => {
  if (newId == '/home') {
    mainStore.routeUrl = 'home'
  } else if (newId == '/search/label') {
    mainStore.routeUrl = 'label'
  } else if (newId == '/search/review') {
    mainStore.routeUrl = 'review'
  }
})
</script>
<style scoped>
</style>
