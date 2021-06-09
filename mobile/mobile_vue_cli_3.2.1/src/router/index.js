import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/home/Home.vue'
// import test from '../pages/home/test.vue'

// const Home = () => import('../pages/home/Home.vue')
const test = () => import('../pages/home/test.vue')
const test1 = () => import('../pages/test')



Vue.use(VueRouter)

export default new VueRouter({
  // mode:'history',
  routes: [
    {
      path: '/home',
      component: Home,
    },
    {
      path: '/test',
      component: test,
    },
    {
      path: '/test1',
      component: test1,
    },
    {
      path: '/',
      redirect: '/home'
    }
  ]
})
