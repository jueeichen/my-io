// pages/orderDetail/orderDetail.js
import {
  baseApi
} from "../../utils/util"

const app = getApp();
Page({


  data: {
    createDateStr:'123',
    orderNo: '',
    status: '',
    statusName: '',
    chargingStandard: '',
    useTime: '',
    amount: '',
    borrowTime: '',
    returnTime: '',
    borrowShopName: '',
    returnShopName: '',
    snNo: '',
    cabinetSnNo: '',
    payType: '',
    payTime: '',
    buyoutTime: '',
    chargeType: '',
    borrowHours: '',
    discount:'1',//优惠金额
  },
  getByOrderNo() {
    let _this = this;
    wx.showLoading({
      title: '加载中...',
    })

    app.http(`${baseApi}token/order/getByOrderNo?orderNo=` + _this.data.orderNo, 'get', {}, true).then(
      res => {
        console.log(res.data);
        wx.hideLoading();
        if (res.data.code == '10000') {
          _this.setData({
            orderNo: res.data.data.orderNo,
            status: res.data.data.status,
            statusName: res.data.data.status == '6' ? "租借失败" : res.data.data.status == '5' ? "已超时" : res.data.data.statusName,
            chargingStandard: res.data.data.chargingStandard,
            useTime: res.data.data.useTime,
            amount: res.data.data.amount == null || res.data.data.amount == undefined ? '0' : res.data.data.amount,
            realAmount: res.data.data.realAmount == null || res.data.data.realAmount == undefined ? '0' : res.data.data.realAmount,
            borrowTime: res.data.data.borrowTime,
            returnTime: res.data.data.returnTime,
            borrowShopName: res.data.data.borrowShopName,
            returnShopName: res.data.data.returnShopName,
            snNo: res.data.data.snNo,
            cabinetSnNo: res.data.data.cabinetSnNo,
            payType: res.data.data.payType == null || res.data.data.payType == undefined ? '未支付' : res.data.data.payType,
            payTime: res.data.data.payTime == null || res.data.data.payTime == undefined ? '--' : res.data.data.payTime,
            buyoutTime: res.data.data.buyoutTime == null || res.data.data.buyoutTime == undefined ? '--' : res.data.data.buyoutTime,
            chargeType: res.data.data.chargeType,
            borrowHours: res.data.data.borrowHours == null || res.data.data.borrowHours == undefined ? '--' : res.data.data.borrowHours,
            createDate: res.data.data.createDate == null || res.data.data.createDate == undefined ? '--' : res.data.data.createDate,
            createDateStr: res.data.data.createDateStr == null || res.data.data.createDateStr == undefined ? '--' : res.data.data.createDateStr,
            popFailReason: res.data.data.popFailReason == null || res.data.data.popFailReason == undefined ? '--' : res.data.data.popFailReason
          })
_this.setData({
  discount: (+this.data.amount - (+this.data.realAmount)).toFixed(2)
})
        }
      }
    );
  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let _this = this;
    console.log(options);

    if (options.orderNo != undefined) {
      _this.setData({
        orderNo: options.orderNo
      });
    }

    this.getByOrderNo();
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

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

  }
})