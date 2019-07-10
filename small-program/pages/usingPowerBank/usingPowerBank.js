import { baseApi, request } from "../../utils/util"

const app = getApp();

Page({
  data: {
    useAmount: '0',
    chargingStandard: '',
    userTime: '',
    isShowMessage: false,// 是否显示信息
  },
  isShowMessageFalse() {
    this.setData({ isShowMessage: false })
  },
  isShowMessageTrue() {
    this.setData({ isShowMessage: true })
  },
  getRentDataByPb() {
    let _this = this;

    var snNo = wx.getStorageSync('snNo');

    request(`${baseApi}token/order/getRentDataByPb?snNo=` + snNo).then(
      res => {
        // console.log(res.data);
        if (res.data.code == '10000') {
          _this.setData({
            useAmount: res.data.data.useAmount,
            chargingStandard: res.data.data.chargingStandard,
            userTime: res.data.data.userTime,
          })
        }
      }
    );
  },

  onLoad(e) {

    this.getRentDataByPb();
  },

});
