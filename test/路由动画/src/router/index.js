import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../pages/home/Home.vue')
const Home1 = () => import('../pages/home/Home1.vue')
const Home2 = () => import('../pages/home/Home2.vue')

Vue.use(VueRouter)

export default new VueRouter({
  // mode:'history',
  routes: [
    {
      path: '/home',
      component: Home,
      meta:{index:0},
    },{
      path: '/home1',
      component: Home1,
      meta:{index:1},
    },{
      path: '/home2',
      component: Home2,
      meta:{index:2},
    },
    {
      path: '/',
      redirect: '/home'
    }
  ]
})
