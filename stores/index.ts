import {defineStore} from "pinia";

export const useMainStore = defineStore('main',{
  state(){
    return{
      routeUrl:'' as string
    }
  },
  actions:{
    backToTop(){
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    }
  }
})

