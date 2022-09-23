import {createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router";

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component:() => import('../views/Home.vue'),
    meta:{
      KeepAlive:true
    }
  },
  {
    path:'/search',
    name:'search',
    component:() => import('../views/Search.vue'),
    meta: {
      KeepAlive: true
    },
    children:[
      {
        path:'/search/label',
        name:'label',
        component:() => import('../views/Label.vue'),
        meta:{
          KeepAlive:true
        }
      },
      {
        path: '/search/review',
        name: 'review',
        component:() => import('../views/Review.vue'),
        meta: {
          KeepAlive: true
        }
      }
    ]
  }
]


const router = createRouter({
  history:createWebHashHistory(),
  routes
})

export default router
