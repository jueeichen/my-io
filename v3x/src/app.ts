import { createApp } from 'vue'
import store from './store/index'

import './app.styl'
import Taro from '@tarojs/taro'

const App = createApp({
  onShow(options) {
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

export default App
