<template>
  <div class="myapp">
      <RouterView v-slot="{Component}">
        <KeepAlive>
          <component :is="Component"/>
        </KeepAlive>
      </RouterView>
  </div>
</template>
<script setup lang="ts">
import {useDark} from '@vueuse/core'

const isDark = useDark()
</script>
<style>

</style>
