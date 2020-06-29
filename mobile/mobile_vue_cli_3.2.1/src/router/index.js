import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../pages/home/Home.vue')
const test = () => import('../pages/home/test.vue')


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
      path: '/',
      redirect: '/home'
    }
  ]
})
