import { baseApi } from "/utils/util"

const app = getApp();

Page({
  data: {
    orderNo: '',
    status: '',
    statusName: '',
    chargingStandard: '',
    useTime: '',
    amount: '',
    borrowTime: '',
    returnTime: '',
    borrowShopName: '',
    returnShopName: '',
    snNo: '',
    cabinetSnNo: '',
    payType: '',
    payTime: '',
    buyoutTime: '',
    chargeType: '',
    borrowHours: '',
  },

  getByOrderNo() {
    let _this = this;
    my.showLoading();

    var token = app.get('token');

    my.httpRequest({
      url: `${baseApi}token/order/getByOrderNo?orderNo=` + _this.data.orderNo,
      method: 'get',
      headers:{
        'token': token
      },
      dataType: 'json',
      success: function(res) {
        console.log(res.data);
        my.hideLoading();
        if (res.data.code=='10000') {
          _this.setData({
            orderNo: res.data.data.orderNo,
            status: res.data.data.status,
            statusName: res.data.data.statusName,
            chargingStandard: res.data.data.chargingStandard,
            useTime: res.data.data.useTime,
            amount: res.data.data.amount,
            borrowTime: res.data.data.borrowTime,
            returnTime: res.data.data.returnTime,
            borrowShopName: res.data.data.borrowShopName,
            returnShopName: res.data.data.returnShopName,
            snNo: res.data.data.snNo,
            cabinetSnNo: res.data.data.cabinetSnNo,
            payType: res.data.data.payType,
            payTime: res.data.data.payTime,
            buyoutTime: res.data.data.buyoutTime,
            chargeType: res.data.data.chargeType,
            borrowHours: res.data.data.borrowHours
          })
          
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
      _this.setData({
        orderNo: e.orderNo
      });
    }

    this.getByOrderNo();
  },

});
