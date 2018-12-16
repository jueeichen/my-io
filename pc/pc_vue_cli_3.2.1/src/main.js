import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./assets/css/reset.css"
import './mock/mockServer'
Vue.config.productionTip = false //阻止生产环境生成警告;

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
