import { baseApi } from "/utils/util"

const app = getApp();

Page({
  data: {
    state1: true,
    state2: false,
    state3: false,
  },

  toPop(orderNo) {
    let _this = this;

    var token = app.get('token');

    console.log(token);
    my.httpRequest({
      url: `${baseApi}token/order/toPop?orderNo=` + orderNo,
      method: 'get',
      headers:{
        'token': token
      },
      dataType: 'json',
      success: function(res) {
        console.log(res.data);
        if (res.data.code=='10000') {
          _this.setData({
            state1: false,
            state2: true,
            state3: false,
            freeExperienceMinutes: res.data.data.freeExperienceMinutes,
            hourlyFee: res.data.data.hourlyFee,
            cappingEveryday: res.data.data.cappingEveryday,
            buyoutOvertime: res.data.data.buyoutOvertime,
          })
        } else {
          _this.setData({
            state1: false,
            state2: false,
            state3: true,
          })

        }
        
      },
      fail: function(res) {
        console.log(res)
      },
    });
  },

  toMemberCenter() {
    my.navigateTo({
      url: '/pages/member/member'
    })
  },

  toMemberHelp() {
    my.navigateTo({
      url: '/pages/memberHelp/memberHelp'
    })
  },

  toScan() {
    my.scan({
      
    });
  },

  onLoad(option) {
    let _this = this;

    _this.toPop(option.orderNo);
  },
});
