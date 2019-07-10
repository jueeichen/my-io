// pages/rentChargingline/rentChargingline.js
import {
  baseApi,
  orgId,
  request
} from "../../utils/util"
const app = getApp();
const innerAudioContext = wx.createInnerAudioContext()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    snNo: '',
    isActive: true, //设备是否激活
    isLeasing: false, //设备是否此正在租赁
    rentLists: [],
    innerAudioContext: ''
  },
  //播放语音:
  openAudio() {

    innerAudioContext.autoplay = true
    innerAudioContext.src = `${baseApi}/media/line1.mp3`
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
  },
  getLineIndexConf() {
    wx.showLoading({
      title: '加载中...',
    })
    let _this = this;

    var snNo = wx.getStorageSync('snNo');

    request(`${baseApi}rent/getLineIndexConf?snNo=` + snNo + '&orgId=' + orgId, {}, 'GET', false).then(
      res => {
        // wx.hideLoading();
        // console.log("r+e+s=")
        // console.log(res)
        if (res.data.code == '10000') {
          if (res.data.data.status == '9') {
            wx.redirectTo({
              url: "../../pages/noActive/noActive"
            });
          } else {
            //可租借=>线充
            this.setData({
              rentLists: res.data.data.packages
            });
            wx.hideLoading()
            this.openAudio();
          }
        } else {
          wx.showToast({
            title: `${res.data.message}`,
          })
          wx.hideLoading()
        }
      }
    );
  },


  /* 
   * 获取充电类型 => 跳转页面
   * 类型： 1: 2小时(3元); 2:5小时(5元); 3:12小时(10元)
   */
  jumpLinePwd(e) {

    console.log(e)
    let lineConfId = e.detail.target.dataset.type;
    let formId = e.detail.formId;
    let _this = this;

    console.log("" + lineConfId + "" + formId + "")
    var token = wx.getStorageSync('token');
    var snNo = wx.getStorageSync('snNo');
    if (token) {
      _this.getLineRentStatus(token).then(res=>{
        if(res=='1'){
          return false
        }
      })
      // return false
    }
    wx.showLoading({
      title: "加载中..."
    });

  
      _this.toCreateOrder(token, snNo, lineConfId, formId);
  

  },

  toCreateOrder(token, snNo, lineConfId, formId) {
    let _this = this;
    app.createOrder(token, '2', '', '', '0', snNo, lineConfId, formId).then(
      res => {
        console.log(res);

        if (!res) {
          wx.hideLoading();
          wx.showToast({
            title: '租借失败'
          });
        } else {
          if (res.data.code == '10000') { //调用成功
            var jsonObj = JSON.parse(res.data.data.orderStr);
            console.log(jsonObj)
            wx.requestPayment({
              timeStamp: jsonObj.timeStamp,
              nonceStr: jsonObj.nonceStr,
              package: jsonObj.package,
              signType: jsonObj.signType,
              paySign: jsonObj.paySign,
              success: function() {
                wx.showLoading({
                  title: '加载中...',
                })

                setTimeout(() => {
                  wx.hideLoading();
                  console.log("+++res.orderNo+++")
                  console.log(res.data.data.orderNo)
                  wx.navigateTo({
                    url: "../../pages/providePassWord/providePassWord?orderNo=" + res.data.data.orderNo
                  });
                }, 1500)
              },
              fail: function(res) {
                wx.hideLoading();

                wx.showToast({
                  title: '租借失败'
                });
                console.log(JSON.stringify(res));
              }
            })
          } else {
            wx.hideLoading();


          }
        }

      }
    );
  },

  getLineRentStatus(token) {
    wx.showLoading({
      title: '加载中...',
    })
    return new Promise((resolve, reject) => {
      var snNo = wx.getStorageSync('snNo');

      app.http(`${baseApi}token/user/getLineRentStatus?snNo=` + snNo, 'get', {}, true).then(
        res => {
          wx.hideLoading();
          if (res.data.code == '10000') {
            //此设备正在租赁中... => 跳转租赁倒计时页面
            if (res.data.data.status == '1') {
              wx.navigateTo({
                url: "../../pages/providePassWord/providePassWord?orderNo=" + res.data.data.orderNo
              });
              resolve(2)
              return false
            } else {
              resolve(1)
            }
            wx.hideLoading()
          } else {
            resolve(0)
          }
        }
      );
    })

  },

  toRentRecord() {
    var token = wx.getStorageSync('token');

    if (token) {
      wx.navigateTo({
        url: "../../pages/rentalRecords/rentalRecords"
      });
    } else {
      wx.navigateTo({
        url: "../../pages/login/login"
      });;
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
    app.setStora(options, '2');

    //判断是否登录，已登录则判断租借状态
    var token = wx.getStorageSync('token');
    if (token) {
      this.getLineRentStatus(token);
    } else {
      // wx.navigateTo({
      //   url: '/pages/login/login',
      // })
      // return false
    }
    var snNo = wx.getStorageSync('snNo');
    this.setData({
      snNo: snNo
    })
    this.getLineIndexConf();




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
    innerAudioContext.stop()

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