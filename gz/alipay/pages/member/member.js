import { baseApi, testApi } from "../../utils/util";
const app = getApp();

Page({
  data: {
    userInfo: {
      nickName: '',
      avatar: '/assets/images/avatar.png'
    },
    userId: '',
    balanceMoney: 0,
    depositMoney: 0,
    isPopShow: false,     //弹窗是否显示
    isNoPayOrder: true,  //是否有未支付订单
    items2: [
      {
        title: '租借记录',
        arrow: true,
        thumb: '/assets/images/mLeaserecordIco.png',
        url: '/pages/memberLease/memberLease'
      },
      {
        title: '帮助中心',
        arrow: true,
        thumb: '/assets/images/mHelpIco.png',
        url: '/pages/memberHelp/memberHelp'
      },
      {
        title: '意见反馈',
        arrow: true,
        thumb: '/assets/images/mFeedbackIco.png',
        url: '/pages/memberFeedback/memberFeedback'
      },
      {
        title: '关于我们',
        arrow: true,
        thumb: '/assets/images/mContactIco.png',
        url: '/pages/memberAboutUs/memberAboutUs'
      },
    ],
  },


  /* 用户信息 */
  getUserInfo(){
    let _this = this;

    var token = app.get('token');

    my.request({
      url: `${baseApi}token/user/getUserInfo`,
      method: 'post',
      headers:{
        'token': token
      },
      dataType: 'json',
      success: function(res) {
        console.log(res)
        _this.setData({
          userId: res.data.data.userId,
          balanceMoney: res.data.data.balanceMoney,
          depositMoney: res.data.data.depositMoney,
          isNoPayOrder: res.data.data.haveNoPayOrder,  //是否有未支付订单
        });
      },
      fail: function(res) {
        console.log(res)
      },
    })
  },

  onLoad() {
    let _this = this;
    //取头像信息
    app.getUserInfo()
      .then( res => {
        console.log(res)
        _this.setData({
          userInfo: res
        })
          
      })
      .catch( err =>{
        console.log(err)
      });

    _this.getUserInfo();
  },

  //退押金-弹窗
  showPopBtn(){
    this.setData({
      isPopShow: true
    })
  },

  //确定事件
  onSureHandle(data){
    let _this = this;

    _this.setData({
      isPopShow: false
    })

    my.showLoading({
      content: "加载中..."
    });

    var token = app.get('token');

    //没有未支付订单 => 直接退款押金； 有支付订单 => 先扣款后退剩余押金
    let url = `${baseApi}token/order/depositRefund`;
    app.http(url, "POST", {}, token) 
        .then( res=>{
          console.log(res);
          my.hideLoading();

          if (res.data.code=='10000') {
            //跳转退押金成功页面
            my.navigateTo({
              url: '/pages/memberDepositRefund/memberDepositRefund?depositMoney=' + res.data.data.refundAmount 
                    + '&orderStatus=0&orderMoney=0&applyDate=' + res.data.data.applyDate
            })
          } else {
            _this.setData({
              isPopShow: false
            });
            my.alert({
              title: res.data.message 
            });
          }
          //确定 - 逻辑
          my.navigateTo({
            url: 'pages/payDeposit/payDeposit'
          });
      })
  },

  //取消
  onCancleHandle(data){
    this.setData({
      isPopShow: false
    })
  }

});
