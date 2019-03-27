import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import echarts from 'echarts';
import 'element-ui/lib/theme-chalk/index.css';
import "./assets/css/reset.css"
import './mock/mockServer'
// import BaiduMap from 'vue-baidu-map'
// Vue.use(BaiduMap, {
//   // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
//   ak: 'BDXNpcRML9XnvnGQrHkGGuSkALpt5dHs'
// })
Vue.use(ElementUI);

Vue.prototype.$echarts = echarts
Vue.config.productionTip = false //阻止生产环境生成警告;

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
