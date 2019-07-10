Page({
  data: {
    depositMoney: '',
    orderStatus: false,
    orderMoney: '',
    applyDate: ""
  },

  //会员中心
  jumpMemberCenter(){
    my.navigateTo({
      url: '/pages/member/member'
    });
  },

  //回首页
  jumpScan(){
    // my.navigateTo({
    //   url: '/pages/index/index'
    // });
    my.scan({
      type: 'qr',
      success: res => {
        console.log(res);
      },
    })
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
