import { baseApi } from "/utils/util"

const app = getApp();

Page({
  data: {
    changeVal: false,
    rentalDeposit: ''
  },

  changeEvent(e){
    let _this = this;
    _this.data.changeVal = e.detail.value;
    console.log(_this.data.changeVal);
  },
  
  //支付
  payBtnEvent(e){
    let _this = this;

    var token = app.get('token');
    var snNo = app.get('snNo');

    my.showLoading();
    console.log(_this.data.changeVal)

    app.createOrder(token, '1', snNo, '3', _this.data.changeVal ? '1' : '0', '', '', e.detail.formId).then(
      res => {
        my.hideLoading();

        if (!res) {
          my.alert({
            title: '租借失败' 
          });
        } else {
          if (res.data.code=='10000') {//调用成功
            my.tradePay({
              tradeNO: res.data.data.orderStr, //完整的支付参数拼接成的字符串，从服务端获取
              success: (res1) => {
                console.log(JSON.stringify(res1));
                if (res1.resultCode == '9000') {//订单支付成功
                  //租借成功，调用弹宝
                  my.navigateTo({
                    url: '/pages/treasureState/treasureState?orderNo=' + res.data.data.orderNo
                  })
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
          }
        }
        
      }
    );
  },

  onLoad(e) {
    //console.log(my.getStorageSync({"key": 'isLogin'}));
    //console.log(token)
    let _this = this;
    _this.setData({
      rentalDeposit: e.rentalDeposit
    });
  },
});
