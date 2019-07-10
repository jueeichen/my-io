import {
  baseApi
} from "../../utils/util"
var WxParse = require('../../assets/wxParse/wxParse.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    article: `
            <div>
              <p>计费规则变更为一小时1.5元，计费规则变更为一小时1.5元计费规则变更为一小时1.5元计费规则变更为一小时1.5元计费规则变更</p>
              <p>计费规则变更为一小时1.5元，计费规则变更为一小时1.5元计费规则变更为一小时1.5元计费规则变更为一小时1.5元计费规则变更</p>
            </div>
          `,
    content: [],
    newImg:''
  },
  noticeInfoDetailRequest(id) {
    let _this = this;
    let params = { id }
    wx.showLoading({
      title: "加载中..."
    });
    app.http(`${baseApi}token/user/getNoticeInfoDetail`, "POST", params,true)
      .then(res => {
        console.log(res);
        wx.hideLoading();
        //暂无数据
        _this.setData({
          content: res.data.data,
        })
        _this.setData({
          article: res.data.data.content
        })
        WxParse.wxParse('article', 'html', _this.data.article, _this);
        _this.setData({
          newImg: this.data.content.newsImage ? this.data.content.newsImage : '/assets/images/sysImg.png'
        })
      })
      
      .catch(res => {
        wx.hideLoading();
        console.log(`===> ${res}`);
      })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this=this
    this.noticeInfoDetailRequest(options.id)
    // WxParse.wxParse('article', 'html', _this.data.article, _this);
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