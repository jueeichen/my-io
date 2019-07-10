import { baseApi, request } from "../../utils/util"

const app = getApp();

Page({
  data: {
    orderNo: '',
    chargingStandard: '',
    useTime: '',
    amount: '',
    borrowTime: '',
    returnTime: '',
    borrowShopName: '',
    returnShopName: '',
    snNo: '',
    fromIndex: 0,
    isPopShow: false,      //弹窗是否显示
    isNoPayOrder: false,   //是否有未支付订单
  },

  getByOrderNo() {
    let _this = this;
    wx.showLoading({
      title: '加载中...',
    })

    var orderNo = wx.getStorageSync('orderNo');

    request(`${baseApi}token/order/getByOrderNo?orderNo=` + orderNo).then(
      res => {
        // console.log(res.data);
        wx.hideLoading();
        if (res.data.code == '10000') {
          //判断订单状态，如果已支付完成，则跳转至订单详情

          if (res.data.data.status == '4') {
            wx.redirectTo({
              url: '../../pages/memberLeaseDetail/memberLeaseDetail?orderNo=' + res.data.data.orderNo
            });
          } else {
            _this.setData({
              orderNo: res.data.data.orderNo,
              chargingStandard: res.data.data.chargingStandard,
              useTime: res.data.data.useTime,
              amount: res.data.data.amount,
              borrowTime: res.data.data.borrowTime,
              returnTime: res.data.data.returnTime,
              borrowShopName: res.data.data.borrowShopName,
              returnShopName: res.data.data.returnShopName,
              snNo: res.data.data.snNo
            })
          }


        }
      }
    );
  },

  //押金提现-按钮
  handleDeposit() {
    let _this = this;
    _this.setData({
      isPopShow: true
    });
  },

  //弹窗-取消
  onCancleHandle() {
    let _this = this;
    _this.setData({
      isPopShow: false
    });
  },

  //弹窗 - 确定
  onSureHandle() {
    let _this = this;
    wx.showLoading({
      title: '加载中...',
    })

    request(`${baseApi}token/order/depositRefund`, {}, 'POST').then(
      res => {
        // console.log(res.data);

        _this.setData({
          isPopShow: false
        });
        wx.hideLoading();

        if (res.data.code == '10000') {
          //跳转退押金成功页面
          wx.redirectTo({
            url: '../../pages/memberDepositRefund/memberDepositRefund?depositMoney=' + res.data.data.refundAmount
              + '&orderStatus=1&orderMoney=' + res.data.data.realAmount + '&applyDate=' + res.data.data.applyDate
          })
        } else {
          _this.setData({
            isPopShow: false
          });
          wx.showModal({
            content: res.data.message
          });
        }
      }
    );
  },

  payByOrderNo() {
    let _this = this;
    wx.showLoading({
      title: '加载中...',
    })

    var orderNo = wx.getStorageSync('orderNo');

    let data = {
      'orderNo': orderNo
    };

    request(`${baseApi}token/order/payByOrderNo`, data, 'POST').then(
      res => {
        wx.hideLoading();


        if (res.statusCode === 200 && res.data.code == '10000') {
          const orderStr = JSON.parse(res.data.data.orderStr);

          wx.requestPayment({
            timeStamp: orderStr.timeStamp,
            nonceStr: orderStr.nonceStr,
            package: orderStr.package,
            signType: orderStr.signType,
            paySign: orderStr.paySign,
            success(res) {
              if (_this.data.fromIndex == 1) {
                wx.redirectTo({
                  url: '../../pages/index/index'
                })
              } else {
                wx.redirectTo({
                  url: '../../pages/memberLeaseDetail/memberLeaseDetail?orderNo=' + _this.data.orderNo
                })
              }
            },
            fail(err) {
              if (err.errMsg === 'requestPayment:fail cancel') {
                wx.showToast({
                  title: '支付失败'
                });
              }
            }
          })
        } else {
          wx.showToast({
            title: '支付失败'
          });
        }
      }
    );
  },

  onLoad(e) {
    let _this = this;
    // console.log(e);

    if (e.orderNo != undefined) {
      wx.setStorageSync('orderNo', e.orderNo);
    }

    if (e.fromIndex != undefined) {
      _this.setData({
        fromIndex: e.fromIndex
      });
    }

    this.getByOrderNo();
  },

});
