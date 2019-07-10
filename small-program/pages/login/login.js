import { checkLogin, loginByWeixin } from "../../utils/user"
import { showErrorToast, baseApi} from '../../utils/util'

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    appLogo:'/assets/images/aboutUslogo.png'
  },

  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  wxLogin: function (e) {
    // console.info(e.detail)
    if (e.detail.userInfo == undefined) {
      app.globalData.hasLogin = false;
      showErrorToast('微信登录失败');
      return;
    }

    checkLogin().catch(() => {
      loginByWeixin(e.detail.userInfo).then(logined => {
        if (logined) {
          wx.navigateBack({
            delta: 1
          })
        }
      }).catch((err) => {
        showErrorToast('微信登录失败');
      });

    });
  },
})