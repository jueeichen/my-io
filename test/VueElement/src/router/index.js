import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../pages/home/Home.vue')
const Test = () => import('../pages/test/Test.vue')
const Echarts = () => import('../pages/echarts/Echarts.vue')

Vue.use(VueRouter)

const router = new VueRouter({
  // mode:'history',
  routes: [
    {
      path: '/home',
      component: Home,
    },
    {
      path: '/test',
      component: Test,
    },
    {
      path: '/echarts',
      component: Echarts,
      // beforeEnter: (to, from, next) => {
      //   // ...
      //   next()
      // },
      // beforeLeave : (to, from, next) => {
      //   const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
      //   if (answer) {
      //     next()
      //   } else {
      //     next(false)
      //   }
      // }
    },
    {
      path: '/',
      redirect: '/echarts'
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   next()
// })


export default router;