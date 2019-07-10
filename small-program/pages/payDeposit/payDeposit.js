import { baseApi } from "../../utils/util"

const app = getApp();

Page({
  data: {
    checkVals: [{
      name: 'checked',
      checked: true
    }],
    changeVal: true,
    rentalDeposit: ''
  },

  changeEvent(e) {
    if (e.detail.value[0] === 'checked') {
      this.setData({
        changeVal: true
      })
    } else {
      this.setData({
        changeVal: false
      })
    }
  },

  //支付
  payBtnEvent(e) {
    let _this = this;

    const token = wx.getStorageSync('token');
    const snNo = wx.getStorageSync('snNo');

    wx.showLoading({
      title: '加载中...',
    })

    app.createOrder(token, '1', snNo, '3', _this.data.changeVal ? '1' : '0', '', '', e.detail.formId).then(
      res => {
        wx.hideLoading();
        console.log(res)
        
        if (res.statusCode === 200 && res.data.code == '10000') {
          const orderStr = JSON.parse(res.data.data.orderStr);
          
          wx.requestPayment({
            timeStamp: orderStr.timeStamp,
            nonceStr: orderStr.nonceStr,
            package: orderStr.package,
            signType: orderStr.signType,
            paySign: orderStr.paySign,
            success: () => {
              wx.navigateTo({
                url: `../../pages/treasureState/treasureState?orderNo=${res.data.data.orderNo}`
              })
              // wx.redirectTo({
              //   url: `../../pages/operationSuccess/operationSuccess?orderNo=${res.data.data.orderNo}&rentalDeposit=${this.data.rentalDeposit}`,
              // })
            },
            fail(err) {
              if (err.errMsg === 'requestPayment:fail cancel') {
                wx.showToast({
                  title: '租借失败',
                })
                // wx.navigateTo({
                //   url: '../../pages/operationFailed/operationFailed',
                // });
              }
            }
          })
        } else {
          wx.showToast({
            title: '租借失败',
          })
          wx.navigateTo({
            url: '../../pages/operationFailed/operationFailed?content='+res.data.message,
          });
        }

      }
    );
  },

  onLoad(e) {
    let _this = this;
    _this.setData({
      rentalDeposit: e.rentalDeposit
    });

    wx.hideLoading();
  },
});
