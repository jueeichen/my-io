import { baseApi, orgId, request } from "../../utils/util"
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalElements: '',
    offset: 0,
    pageNum: 10,
    orderList: [],
    scrollViewHeight: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getOrderList({
      offset: 0,
      pageNum: 10
    }).then(res => {
      this.setData({
        totalElements: res.totalElements,
        orderList: res.content.map(item => ({
          orderNumber: item.orderNo,
          detailNumber: item.transAmount,
          payType: item.payType,
          payTime: new Date(item.payTime).toLocaleString()
        }))
      })
    })
  },

  onShow: function() {
    wx.getSystemInfo({
      success: res => {
        this.setData({
          scrollViewHeight: res.windowHeight
        })
      },
    })
  },

  scrollToBottom: function () {
    const { offset, orderList } = this.data;

    this.getOrderList({
      offset: offset + 1,
      pageNum: 10
    }).then(res => {
      if (res.content.length) {
        const addList = res.content.map(item => ({
          orderNumber: item.orderNo,
          detailNumber: item.transAmount,
          payType: item.payType,
          payTime: new Date(item.payTime).toLocaleString()
        }));


        this.setData({
          totalElements: res.totalElements,
          orderList: [...orderList, ...addList]
        })
      } else {
        return;
      }
    })
  },


  getOrderList: function (params) {
    const { offset, orderList } = this.data;

    return new Promise((resolve, reject) => {
      request(`${baseApi}token/user/getTransactionInfo`, {
        filter: '1',
        pageNum: params.pageNum,
        from: params.offset
      }, 'POST').then(res => {
        if (res.statusCode === 200 && res.data.code === '10000') {
          if (res.data.data) {
            resolve(res.data.data)
          } else {
            reject()
          }
        } else {
          reject()
        }

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
      })
    })
  }


})
