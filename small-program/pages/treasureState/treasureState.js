// pages/treasureState/treasureState.js
import {
  baseApi,
  request,
  urlToObj
} from "../../utils/util.js"
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    timer: null,
    state1: true,
    state2: false,
    state3: false,
    step: 0, //进度百分比为step/2
    freeExperienceMinutes: '',
    hourlyFee: '',
    cappingEveryday: '',
    buyoutOvertime: '',
    rentalDeposit: ''
  },
  toPop(orderNo) {
    request(`${baseApi}token/order/toPop?orderNo=` + orderNo, {}, "GET").then(
      (res) => {
        console.log("弹宝请求返回的参数：" + res.data.data.isPop)

        if (res.data.code == '10000') {
          if (res.data.data.isPop == '1') {
            this.setData({
              state1: false,
              state2: true,
              state3: false,
              freeExperienceMinutes: res.data.data.freeExperienceMinutes,
              hourlyFee: res.data.data.hourlyFee,
              cappingEveryday: res.data.data.cappingEveryday,
              buyoutOvertime: res.data.data.buyoutOvertime,
              rentalDeposit: res.data.data.rentalDeposit,
            })

            wx.setNavigationBarTitle({
              title: '租借成功'
            })

            clearInterval(this.data.timer);
          } else if (res.data.data.isPop == '2') {
            this.setData({
              state1: false,
              state2: false,
              state3: true,
            })

            wx.setNavigationBarTitle({
              title: '弹出失败',

            })

            clearInterval(this.data.timer);
          } else {
            // this.data.timer = setTimeout(() => {
            // this.toPop(orderNo);
            // }, 300);
          }
        }

      }
    )
  },

  toMemberCenter() {
    console.log(111);
    wx.redirectTo({
      url: '../../pages/member/member'
    })
  },

  toMemberHelp: function() {
    wx.redirectTo({
      url: '../../pages/memberHelp/memberHelp'
    })
  },

  toScan: function() {
    wx.scanCode({
      success: res => {
        const {
          type,
          snNo
        } = urlToObj(res.result.split('?')[1]);

        if (snNo) {
          wx.setStorageSync('snNo', snNo);

          if (type == '1') { //跳转到宝充首页
            wx.redirectTo({
              url: '../../pages/index/index'
            });
          } else if (type == '2') { //跳转到线充首页
            wx.redirectTo({
              url: '../../pages/rentChargingline/rentChargingline'
            });
          } else {
            wx.showToast({
              title: '无效的二维码'
            });
          }
        } else {
          wx.showToast({
            title: '扫码失败',
          })
        }
      },
      fail: err => {
        wx.showToast({
          title: '扫码失败'
        })
      }
    })
  },

  //圆形进度条背景:
  drawProgressbg() {
    let ctx = wx.createCanvasContext('canvasProgressbg')
    ctx.setLineWidth(5); // 设置圆环的宽度  
    ctx.setStrokeStyle('#F1F1F1');
    ctx.setLineCap('round')
    ctx.beginPath();
    //设置一个例如原点(260, 260, 240(半径),开始幅度,结束幅度)  
    ctx.arc(130, 130, 120, 0, 2 * Math.PI);
    ctx.stroke(); //对当前路径进行描边  
    ctx.draw(); //画他

  },
  //圆形进度条本体:
  drawCircle(step) {
    let ctx = wx.createCanvasContext('canvasProgress');
    ctx.setLineWidth(5);

    let gradient = ctx.createLinearGradient(200, 100, 100, 200);    // 设置渐变色
    gradient.addColorStop("0", "#FF7123");
    gradient.addColorStop("1.0", "#FFC720");
    ctx.setStrokeStyle(gradient);

    ctx.setLineCap('round')
    ctx.beginPath();
    // 参数step 为绘制的圆环周长，从0到2为一周 。 -Math.PI / 2 将起始角设在12点钟位置 ，结束角 通过改变 step 的值确定     
    ctx.arc(130, 130, 120, -Math.PI / 2, step * Math.PI - Math.PI / 2);
    ctx.stroke();
    ctx.draw()

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    setTimeout(() => {
      this.toPop(options.orderNo);
    }, 3000)
    // this.toPop("ZB190426090351178101123");

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.drawProgressbg();
    let timer = setInterval(() => {
      let step = this.data.step
      if (step < 198) {
        this.drawCircle(step /
          100);
        step += 2;
        this.setData({
          step
        })
      }
      if (step >= 198) {
        clearInterval(timer)
      }
    }, 200)

  },
})