// components/submitButton/submitButton.js
import {
  baseApi
} from "../../utils/util"
const app = getApp();
Component({
  externalClasses: ['wx_btn'],//使用父组件的样式
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    getFormId(e) {
      console.log("submit button");
      const formId = e.detail.formId
      const flag = formId.indexOf("formId")
      if (wx.getStorageSync("token") && flag == -1) {
        app.http(`${baseApi}token/user/saveFormId`, 'GET', {
          formId
        }, true).then(res => {
          console.log("formId提交 , 接口返回")
          console.log(res)
        })
      }
    },
  }
})
