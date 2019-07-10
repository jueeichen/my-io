//index.js
import { baseApi } from "/utils/util"
const app = getApp();

Page({
  data: {
    userInfo: {},
    //isJumpBackend: false, //是否跳转后端api，获取userID
    isAuthor: false,      //是否授权
    isDisabled: true,
    isDeposit: false,
    isShowActive: false,
    rentalDeposit: '',
    userLeaseStatus: '', //用户借款的状态， 1：无可借充电宝； 2：正在租借中； 3：有未支付订单； 
    isPopShow: false,    //弹窗是否显示
  },

  //租借
  toRent(e){
    let _this = this;
    if (_this.isDeposit) {
      //已缴纳押金
    } else {
      //未缴纳押金,先进入信用免押
      _this.payBtnEvent(e.detail.formId);
    }
    
  },

  //调用信用授权
  payBtnEvent(_formId){
    let _this = this;

    var token = app.get('token');
    var snNo = app.get('snNo');

    my.showLoading();

    app.createOrder(token, '1', snNo, '1', '0', '', '', _formId).then(
      res => {
        my.hideLoading();

        if (!res) {
          my.alert({
            title: '租借失败' 
          });
        } else {
          if (res.data.code=='10000') {//调用成功
            my.tradePay({
              orderStr: res.data.data.orderStr, //完整的支付参数拼接成的字符串，从服务端获取
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
                  //取消后，跳转押金充值
                  my.navigateTo({
                    url: '/pages/payDeposit/payDeposit?rentalDeposit=' + _this.data.rentalDeposit
                  })
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

  getUserId(){
    let _this = this;
    var isLogin = app.get('isLogin');
    if (isLogin){
      _this.getRentIndexConf();
    } else{ 
      app.getUserId().then(
        res => {
          _this.getRentIndexConf()
        }
        
      );
    }
  },

  getRentIndexConf() {
    let _this = this;

    var snNo = app.get('snNo');
    var token = app.get('token');
    console.log(snNo + ',' + token);
    my.httpRequest({
      url: `${baseApi}token/rent/getRentIndexConf?snNo=` + snNo,
      method: 'get',
      headers:{
        'token': token
      },
      dataType: 'json',
      success: function(res) {
        console.log(res.data);
        my.hideLoading();
        const { hourlyFee, cappingEveryday, isDeposit, rentalDeposit, status, freeExperienceMinutes, powerbankThrowTime, orderNo } = res.data.data;
        if (res.data.code=='10000') {
          _this.setData({
            chargeText: `每小时${hourlyFee}元，每天${cappingEveryday}元封顶`,
            isDeposit: isDeposit == '1' ? true : false,
            rentalDeposit: rentalDeposit,
            userLeaseStatus: status
          });

          if ( freeExperienceMinutes != null &&  freeExperienceMinutes != '0') {
            _this.setData({
              activeTextEx: `前${freeExperienceMinutes}分钟免费，`,
            });
          }

          if ( powerbankThrowTime != null &&  powerbankThrowTime != '0') {
            _this.setData({
              activeText: `限时免费${powerbankThrowTime}分钟`,
              isShowActive: true,
            });
          }

          if ( status == '1' ) {//无可借充电宝
            //展示提示框，点击后跳转页面
            my.redirectTo({
              url: '/pages/noRent/noRent'
            });
          } else if ( status == '2' ) {//正在租借中
            //先弹窗 => 1s后跳转
            setTimeout( ()=> {
              my.redirectTo({
                url: '/pages/usingPowerBank/usingPowerBank'
              });
            }, 1000);
            _this.setData({
              isPopShow: true
            })
            
          } else if ( status == '3' ) {//有未支付订单
            //先弹窗 => 1s后跳转
            app.put('orderNo', orderNo);
            setTimeout( ()=> {
              my.redirectTo({
                url: '/pages/paymentOrder/paymentOrder?fromIndex=1'
              });
            }, 1000);
            _this.setData({
              isPopShow: true
            })

          } else {//停留当前页，并去掉加载中，激活租借按钮
            _this.setData({
              isDisabled: false
            });
          }
        }
        
      },
      fail: function(res) {
        my.hideLoading();
        //console.log(res)
      },
    });
  },

  onLoad(option) {
    let _this = this;
    my.showLoading();
    //已授权，已登录(会员)
    _this.getUserId();
  },

  
});
