// pages/payDeposit/payDeposit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  //支付押金
  payDeposit(){
    //加载
    wx.showLoading({
      title: '支付中...',
    });
    setTimeout(function () {
      wx.hideLoading()
    }, 2000)
    //成功
    setTimeout(function () {
      wx.showToast({
        title: '支付成功',
        icon: 'success',
        duration: 2000
      })
    }, 2000)
    //唤起扫描二维码
    /*setTimeout(function () {
      wx.scanCode({
        success(res){
          console.log("扫码成功");
        }
      })
    }, 4000)*/
    setTimeout(function () {
      wx.navigateTo({
        url: '/pages/borrowSuccess/borrowSuccess'
      })
    }, 4000)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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