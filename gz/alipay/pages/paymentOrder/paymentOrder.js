import { baseApi } from "/utils/util"

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
    my.showLoading();

    var orderNo = app.get('orderNo');
    var token = app.get('token');

    my.httpRequest({
      url: `${baseApi}token/order/getByOrderNo?orderNo=` + orderNo,
      method: 'get',
      headers:{
        'token': token
      },
      dataType: 'json',
      success: function(res) {
        console.log(res.data);
        my.hideLoading();
        if (res.data.code=='10000') {
          //判断订单状态，如果已支付完成，则跳转至订单详情
          my.alert(res.data.data.status);
          if (res.data.data.status == '4') {
            my.redirectTo({
              url: '/pages/memberLeaseDetail/memberLeaseDetail?orderNo=' + res.data.data.orderNo
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
        
      },
      fail: function(res) {
        console.log(res)
      },
    });
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
    my.showLoading();

    var token = app.get('token');

    my.httpRequest({
      url: `${baseApi}token/order/depositRefund`,
      method: 'post',
      headers:{
        'token': token
      },
      dataType: 'json',    
      success: function(res) {
        console.log(res.data);

        _this.setData({
          isPopShow: false
        });
        my.hideLoading();

        if (res.data.code=='10000') {
          //跳转退押金成功页面
          my.redirectTo({
            url: '/pages/memberDepositRefund/memberDepositRefund?depositMoney=' + res.data.data.refundAmount 
                  + '&orderStatus=1&orderMoney=' + res.data.data.realAmount + '&applyDate=' + res.data.data.applyDate
          })
        } else {
          _this.setData({
            isPopShow: false
          });
          my.alert({
            title: res.data.message 
          });
        }
        
      },
      fail: function(res) {
        console.log(res)
      },
    });
  },

  payByOrderNo() {
    let _this = this;
    my.showLoading();

    var orderNo = app.get('orderNo');
    var token = app.get('token');

    my.httpRequest({
      url: `${baseApi}token/order/payByOrderNo`,
      method: 'post',
      headers:{
        'token': token
      },
      dataType: 'json',
      data: {
        'orderNo': orderNo
      },
      success: function(res) {
        console.log(res.data);
        my.hideLoading();

        if (res.data.code=='10000') {
          //调起小程序支付
          my.tradePay({
            tradeNO: res.data.data.orderStr, //完整的支付参数拼接成的字符串，从服务端获取
            success: (res1) => {
              console.log(JSON.stringify(res1));
              if (res1.resultCode == '9000') {//订单支付成功
                //支付成功，如果是从首页进来，返回首页，否则去到订单详情页
                if (_this.data.fromIndex == 1) {
                  my.navigateTo({
                    url: '/pages/index/index'
                  })
                } else {
                  my.navigateTo({
                    url: '/pages/memberLeaseDetail/memberLeaseDetail?orderNo=' + _this.data.orderNo
                  })
                }
              } else if (res1.resultCode == '8000') {//正在处理中

              } else if (res1.resultCode == '4000') {//订单支付失败

              } else if (res1.resultCode == '6001') {//用户中途取消
                
              } else if (res1.resultCode == '6002') {//网络连接出错

              } else if (res1.resultCode == '99') {//用户点击忘记密码导致快捷界面退出(only iOS)

              }
              
            },
            fail: (res1) => {
              my.alert({
                title: '租借失败' 
              });
              console.log(JSON.stringify(res1));
            }
          });
        } else {
          my.alert({
            title: res.data.message 
          });
        }
        
      },
      fail: function(res) {
        console.log(res)
      },
    });
  },

  onLoad(e) {
    let _this = this;
    console.log(e);

    if (e.orderNo != undefined) {
      app.put('orderNo', e.orderNo);
    }

    if (e.fromIndex != undefined) {
      _this.setData({
        fromIndex: e.fromIndex
      });
    }

    this.getByOrderNo();
  },

});
