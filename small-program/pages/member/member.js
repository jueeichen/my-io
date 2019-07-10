// pages/member/member.js
import {
  loginByWeixin,
  checkLogin,
} from "../../utils/user.js"
import {
  baseApi,
  request
} from "../../utils/util.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      nickName: 'j',
      avatar: '/assets/images/avatar.png'
    },
    userId: '',
    isDeposit: '0',
    balanceMoney: 0,
    depositMoney: 0,
    isPopShow: false, //弹窗是否显示
    haveNoPayOrder: false, //是否有未支付订单
    isNews: '', //是否有未读消息
    items2: [{
        title: '租借记录',
        arrow: true,
        thumb: '/assets/images/mLeaserecordIco.png',
        url: '/pages/rentalRecords/rentalRecords'
      },
      {
        title: '帮助中心',
        arrow: true,
        thumb: '/assets/images/mHelpIco.png',
        url: '/pages/memberHelp/memberHelp'
      },
      {
        title: '意见反馈',
        arrow: true,
        thumb: '/assets/images/mFeedbackIco.png',
        url: '/pages/feedback/feedback'
      },
      {
        title: '关于我们',
        arrow: true,
        thumb: '/assets/images/mContactIco.png',
        url: '/pages/memberAboutUs/memberAboutUs'
      },
    ],
  },
  showPopBtn() {
    this.setData({
      isPopShow: !this.data.isPopShow
    })
  },
  /* 用户信息 */
  getUserInfo() {
    request(`${baseApi}token/user/getUserInfo`, {}, "POST").then(res => {
      console.log(res)
      if (res.statusCode == "200" && res.data.code == "10000") {
        this.setData({
          isDeposit: res.data.data.isDeposit,
          userId: res.data.data.userId,
          balanceMoney: res.data.data.balanceMoney,
          depositMoney: res.data.data.depositMoney,
          haveNoPayOrder: res.data.data.haveNoPayOrder, //是否有未支付订单
          isNews: res.data.data.newsUnreadNum + res.data.data.noticeUnreadNum > 0 ? 'dot' : '',
        });
      } else {

      }
    })
  },

  /* 退押金 */

  returnDeposit(data) {
    let _this = this;

    this.setData({
      isPopShow: false
    })

    if (this.data.isDeposit) {
      //没有未支付订单 => 直接退款押金； 有支付订单 => 先扣款后退剩余押金
      wx.showLoading({
        title: '加载中...',
      })
      request(`${baseApi}token/order/depositRefund`, {}, "POST").then(res => {
        if (res.data.code == '10000') {
          wx.hideLoading()
          //跳转退押金成功页面
          wx.navigateTo({
            url: '../../pages/memberDepositRefund/memberDepositRefund?depositMoney=' + res.data.data.refundAmount + '&orderStatus=0&orderMoney=0&applyDate=' + res.data.data.applyDate
          })
        } else {
          this.setData({
            isPopShow: false
          });
          wx.hideLoading()
          wx.showModal({
            title: `${res.data.message}`,
          })
        }
      })
    } else {
      return;
    }
  },



  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // checkLogin().catch(err => {
    //   wx.navigateTo({
    //     url: '../../pages/login/login',
    //   })
    // })
    this.getUserInfo()

    if (wx.getStorageSync('userInfo')) {
      const user = JSON.parse(wx.getStorageSync('userInfo'))

      let userInfo = {
        nickName: user.nickName,
        avatar: user.avatarUrl
      }


      this.setData({
        userInfo
      })

    }

  },


})