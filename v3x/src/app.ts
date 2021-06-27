import { createApp } from 'vue'
import store from './store/index'

import './app.styl'
import Taro from '@tarojs/taro'

const App = createApp({
  // mixins: [myMixin],
  onShow(options) {
    if (!wx.getStorageSync('aleadyOpen')) {
      wx.redirectTo({
        url: '/pages/open/index'
      })
    }

    if (options && options.query && options.query.scene) {
      const ivtUid = decodeURIComponent(options.query.scene).replace(/u\=/, '')
      console.log("ivtUid=>")
      wx.setStorageSync('ivtUid', ivtUid)
    }
    this.$nextTick(() => {
      Taro.getApp().globalData = {
        vm: this,
      }
      Taro.getApp().onStart = () => {
        this.$store.dispatch("global/getProfile");
        this.$store.dispatch("global/getUserInfo");
        // this.$store.dispatch("global/getCommonConfImage", "1");
      }
    })


  },

  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})

App.use(store)
// App.mixin(myMixin)
// console.log(App)

App.mixin({
  data() {
    return {
      onShareAppMessage: (options) => {
        // 设置菜单中的转发按钮触发转发事件时的转发内容
        var shareObj = {
          title: "1111",        // 默认是小程序的名称(可以写slogan等)
          path: '/pages/index/index',        // 默认是当前页面，必须是以‘/’开头的完整路径
          imageUrl: '',     //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
        }
        // 来自页面内的按钮的转发
        if (options.from == 'button') {

        }
        // 返回shareObj
        return shareObj;
      }
    }
  }




})
export default App
