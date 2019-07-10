// pages/memberAboutUs/memberAboutUs.js
import { baseApi } from "../../utils/util"

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    aboutLists: [],
    appLogo: '',
    wxAccountName: '',
    servicePhone: '',
    websiteUrl:''
  },
  getOrgInfo() {
    let _this = this;
    wx.showLoading({
      title: '加载中...',
    })

    app.http(`${baseApi}token/org/getOrgInfo`, 'get', {}, true).then(
      res => {
        console.log(res.data);
        wx.hideLoading();
        if (res.data.code == '10000') {

          var aboutListArr = [];
          // aboutListArr.push({
          //   title: '微信公众号',
          //   text: res.data.data.wxAccountName,
          // });

          aboutListArr.push({
            title: '客服电话',
            text: res.data.data.servicePhone,
          });

          aboutListArr.push({
            title: '公司官网',
            text: res.data.data.websiteUrl,
          });


          _this.setData({
            aboutLists: aboutListArr,
            appLogo: res.data.data.appLogo,
            orgName: res.data.data.orgName,
            servicePhone: res.data.data.servicePhone,
            wxAccountName: res.data.data.wxAccountName,
            websiteUrl: res.data.data.websiteUrl,
          });

        }
      }
    );

  },

  /* 事件 */
  handleAboutus(e) {
    let index = e.currentTarget.dataset.key;
    if (index == 0) {
      this.makePhoneCall();
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getOrgInfo();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})