import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../pages/home/Home.vue')
const Test = () => import('../pages/test/Test.vue')

Vue.use(VueRouter)

export default new VueRouter({
  // mode:'history',
  routes: [
    {
      path: '/home',
      component: Home,
    },{
      path: '/test',
      component: Test,
    },
    {
      path: '/',
      redirect: '/home'
    }
  ]
})
