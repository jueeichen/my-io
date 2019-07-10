import { baseApi } from "/utils/util"

const app = getApp();

Page({
  data: {
    useAmount: '0',
    chargingStandard: '',
    userTime: ''
  },

  getRentDataByPb() {
    let _this = this;

    var snNo = app.get('snNo');
    var token = app.get('token');

    my.httpRequest({
      url: `${baseApi}token/order/getRentDataByPb?snNo=` + snNo,
      method: 'get',
      headers:{
        'token': token
      },
      dataType: 'json',
      success: function(res) {
        console.log(res.data);
        if (res.data.code=='10000') {
          _this.setData({
            useAmount: res.data.data.useAmount,
            chargingStandard: res.data.data.chargingStandard,
            userTime: res.data.data.userTime,
          })
        }
        
      },
      fail: function(res) {
        console.log(res)
      },
    });
  },

  onLoad(e) {
    console.log(e);

    this.getRentDataByPb();
  },

});
