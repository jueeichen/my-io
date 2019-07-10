import { baseApi } from "/utils/util"

const app = getApp();

Page({
  data: {
    snNo: '',
    isActive: true,     //设备是否激活
    isLeasing: false,   //设备是否此正在租赁
    djsTime: '',
    endTime: 1553513150000,   //截止时间：2019/3/25 19:25:50
    rentLists: []
  },

  getUserId(){
    let _this = this;

    var isLogin = app.get('isLogin');
    
    if (isLogin){
      var token = app.get('token');
      _this.getLineIndexConf(token);
    } else{ 
      app.getUserId().then(
        res => {
          _this.getLineIndexConf(res.data.data.token)
        }
        
      );
    }
  },

  /* 
  * 获取充电类型 => 跳转页面
  * 类型： 1: 2小时(3元); 2:5小时(5元); 3:12小时(10元)
  */
  jumpLinePwd(e){
    let lineConfId = e.currentTarget.dataset.type;

    let _this = this;

    var token = app.get('token');
    var snNo = app.get('snNo');

    //租借成功，获取密码
    // my.navigateTo({
    //   url: `/pages/rentCharginglinePassword/rentCharginglinePassword?orderNo=ZB190315183425138821913`
    // });
    // return;

    my.showLoading();

    app.createOrder(token, '2', '', '', '0', snNo, lineConfId).then(
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
                  //租借成功，获取密码
                  my.redirectTo({
                    url: `/pages/rentCharginglinePassword/rentCharginglinePassword?orderNo=`+res.data.data.orderNo
                  });
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

  getLineIndexConf(token) {
    let _this = this;

    var snNo = app.get('snNo');
    var tokenStr = app.get('token');
    console.log(tokenStr+','+snNo);
    my.httpRequest({
      url: `${baseApi}token/rent/getLineIndexConf?snNo=` + snNo,
      method: 'get',
      headers:{
        'token': token
      },
      dataType: 'json',
      success: function(res) {
        console.log(res.data);
        my.hideLoading();
        if (res.data.code=='10000') {
          //没激活 => 跳转
          if(res.data.data.status=='9'){
            my.redirectTo({
              url: "/pages/rentChargingLineNotactive/rentChargingLineNotactive"
            });
          }
          //此设备正在租赁中... => 跳转租赁倒计时页面
          else if(res.data.data.status=='1'){
            my.redirectTo({
              url: "/pages/rentCharginglinePassword/rentCharginglinePassword?orderNo=" + res.data.data.orderNo
            });
          }
          //可租借=>线充
          else{
            _this.setData({
              rentLists: res.data.data.packages
            });
          }
          
        }
        
      },
      fail: function(res) {
        my.hideLoading();
        console.log(res)
      },
    });
  },

  toRentRecord() {
    my.navigateTo({
      url: "/pages/memberLease/memberLease"
    });
  },

  onLoad(e) {
    my.showLoading({
      content: '加载中...'
    });

    my.showLoading();
    //已授权，已登录(会员)
    this.getUserId();
  }
});
