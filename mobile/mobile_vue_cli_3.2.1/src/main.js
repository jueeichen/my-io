import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import $ from 'zepto-webpack'
import './mock/mockServer'
import "./assets/css/reset.css"
import NP from 'number-precision'
import _ from 'lodash'
Vue.prototype._ = _
Vue.config.productionTip = false //阻止生产环境生成警告;
Vue.prototype.$np=NP;
if(process.env.NODE_ENV=='development'){
  // const VConsole = require('vconsole')
  // const vconsole = new VConsole();
  // Vue.use(vconsole)
}


// console.log('Hello world');
new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
