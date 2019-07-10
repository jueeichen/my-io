import { baseApi, urlToObj } from "../../utils/util"

const app = getApp();

Page({
  data: {
    depositMoney: '',
    orderStatus: false,
    orderMoney: '',
    applyDate: ""
  },

  //会员中心
  jumpMemberCenter() {
    wx.redirectTo({
      url: '../../pages/member/member'
    });
  },

  //工具栏 - 扫码
  jumpScan() {
    wx.scanCode({
      success: res => {
        const { type, snNo } = urlToObj(res.result.split('?')[1]);

        wx.setStorageSync('snNo', snNo);
        if (type == '1') {//跳转到宝充首页
          wx.redirectTo({
            url: '../../pages/index/index'
          });
        } else if (type == '2') {//跳转到线充首页
          wx.redirectTo({
            url: '../../pages/rentChargingline/rentChargingline'
          });
        } else {
          wx.showToast({ title: '无效的二维码' });
        }

      },
    });
  },

  onLoad(e) {
    let _this = this;

    _this.setData({
      depositMoney: e.depositMoney,
      orderStatus: e.orderStatus == '0' ? false : true,
      orderMoney: e.orderMoney,
      applyDate: e.applyDate,
    });
  }

});
