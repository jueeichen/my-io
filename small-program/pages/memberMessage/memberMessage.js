// pages/memberHelp/memberHelp.js
import {
  baseApi,
  request
} from "../../utils/util.js";
var WxParse = require('../../assets/wxParse/wxParse.js');

Page({
  data: {
    noticeContent: '',
    contentArr: [], //富文本列表
    isNoData1: false,
    isNoData2: true,
    isNoData3: false,
    isNoData4: true,
    selected: true,
    selected1: false,
    newsUnreadNum: 0,
    noticeUnreadNum: 0,
    isShowDot1: false, //news红点
    isShowDot2: false, //notice红点
    num: 0, //第几页，0,1,2...
    offest: 0, //第几页，0,1,2...
    step: 7, //一页多少个
    messageLists: [], //消息数据
    messageBaseLine: false, ////底线状态，默认不出现，小于一页，拉到底了
    messageTotal: 0, //消息中心  -总个数
    noticeList: [], //系统信息:
    noticeNum: 0, //第几页，0,1,2...
    noticeOffest: 0, //第几页，0,1,2...
    noticeStep: 10, //一页多少个
    noticeMessageBaseLine: false, ////底线状态，默认不出现，小于一页，拉到底了
    noticeTotal: 0, //系统信息  -总个数

  },
  selected: function(e) {
    this.setData({
      selected1: false,
      selected: true,
      isNoData1: false,
      isNoData2: true,
      isNoData3: false,
      isNoData4: true,
    })
    this.accountRequest(0, 1000, true);

  },
  selected1: function(e) {
    this.noticeRequest(0, 1000, true)

    this.setData({
      selected: false,
      selected1: true
    })
  },
  jumpNoticeDetile(e) {
    wx.navigateTo({
      url: `/pages/noticeContent/noticeContent?id=${this.data.noticeList[e.currentTarget.dataset.key].id}`
    });
  },
  /* 用户信息 */
  getUserInfo() {
    request(`${baseApi}token/user/getUserInfo`, {}, "POST").then(res => {
      console.log(res)
      if (res.data.data.newsUnreadNum > 0) {
        this.setData({
          isShowDot1: true,
          newsUnreadNum: res.data.data.newsUnreadNum
        })
      } else {
        this.setData({
          isShowDot1: false,
          newsUnreadNum: 0
        })
      }

      if (res.data.data.noticeUnreadNum > 0) {
        this.setData({
          isShowDot2: true,
          noticeUnreadNum: res.data.data.noticeUnreadNum
        })
      } else {

        this.setData({
          isShowDot2: false,
          noticeUnreadNum: 0
        })
      }
    })
  },
  /* 消息提醒 */
  accountRequest(offest = this.data.offest, step = this.data.step, isRefresh = false) {
    let params = {
      from: offest,
      pageNum: step
    }


    request(`${baseApi}/token/user/getMessageInfo`, params, "POST")
      .then(res => {

        //暂无数据
        if (res.data.data.content.length == 0) {
          console.log(res.data.data.content.length);
          this.setData({
            isNoData1: true,
            isNoData2: false

          })
          // my.stopPullDownRefresh();
        } else {
          this.setData({
            isNoData1: false,
            isNoData2: true

          })
        }

        //如果数据小于10条，不满一页，没数据了  => 把剩余的结果也要追加到类表中 => 再停止
        if (res.data.data.content.length < this.data.step || res.data.data.totalElements == this.data.step) {
          this.setData({

            messageTotal: res.data.data.totalElements,
            messageLists: isRefresh ? res.data.data.content : [...this.data.messageLists, ...res.data.data.content] // true：顶部刷新， false: 数据分页组合
          })
          let newArr = this.data.messageLists
          newArr.map((item, index) => {
            item.isRead === "0" && (item.isRead = true)
            item.isRead === "1" && (item.isRead = false)

          })
          this.setData({
            messageLists: newArr
          })
          return;
        }

        this.setData({

          messageTotal: res.data.data.totalElements,
          messageLists: isRefresh ? res.data.data.content : [...this.data.messageLists, ...res.data.data.content] // true：顶部刷新， false: 数据分页组合
        })
        let newArr = this.data.messageLists
        newArr.map((item, index) => {
          item.isRead === "0" && (item.isRead = true)
          item.isRead === "1" && (item.isRead = false)
        })
        this.setData({
          messageLists: newArr
        })

      })
      .catch(res => {

        console.log(`===> ${res}`);
      })

  },
  /* 系统公告 */
  noticeRequest(offest = this.data.noticeOffest, step = this.data.noticeStep, isRefresh = false) {
    let _this = this;
    let params = {
      from: offest,
      pageNum: step
    }


    request(`${baseApi}/token/user/getNoticeInfo`, params, "POST")
      .then(res => {

        //暂无数据
        if (res.data.data.content.length == 0) {
          this.setData({
            isNoData3: true,
            isNoData4: false
          })
          // my.stopPullDownRefresh();
        } else {
          this.setData({
            isNoData3: false,
            isNoData4: true
          })
        }

        //如果数据小于10条，不满一页，没数据了  => 把剩余的结果也要追加到类表中 => 再停止
        if (res.data.data.content.length < this.data.noticeStep || res.data.data.totalElements == this.data.noticeStep) {
          this.setData({

            noticeTotal: res.data.data.totalElements,
            noticeList: isRefresh ? res.data.data.content : [...this.data.noticeList, ...res.data.data.content] // true：顶部刷新， false: 数据分页组合
          })

        } else {
          this.setData({

            noticeTotal: res.data.data.totalElements,
            noticeList: isRefresh ? res.data.data.content : [...this.data.noticeList, ...res.data.data.content] // true：顶部刷新， false: 数据分页组合
          })
        }

        let contentArr = [];
        _this.data.noticeList.map((item, index) => {
          WxParse.wxParse(`noticeContent`, 'html', item.content, _this)
          contentArr.push(_this.data.noticeContent)
        })
        _this.setData({
          contentArr
        })
        let noticeListNewArr = _this.data.noticeList
        noticeListNewArr.map((item, index) => {
          item.newsImage = item.newsImage == undefined || item.newsImage == '' ? '/assets/images/sysImg.png' : item.newsImage
        })
        _this.setData({
          noticeList: noticeListNewArr
        })
      })
      .catch(res => {
        my.hideLoading();
        console.log(`1===> ${res}`);
      })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

    this.getUserInfo();
    this.accountRequest(0, 1000, true);

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    setTimeout(() => {
      this.setData({
        selected: true,
        selected1: false
      })
    }, 500)

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  scrollToTop: function() {
    console.log('scrollToTop')
  },
  scrollToBottom: function() {
    console.log("123")

  }
})