//index.js
import {
  baseApi,
  orgId,
  request
} from "../../utils/util"
import {
  loginByWeixin
} from '../../utils/user'
const app = getApp();

Page({
  data: {
    userInfo: {},
    //isJumpBackend: false, //是否跳转后端api，获取userID
    isAuthor: false, //是否授权
    isDisabled: true,
    isDeposit: false,
    isShowActive: false,
    rentalDeposit: '',
    userLeaseStatus: '', //用户借款的状态， 1：无可借充电宝； 2：正在租借中； 3：有未支付订单； 
    isPopShow: false, //弹窗是否显示
    activeTextEx: '',
    activeText: '',
    chargeText: '',
    popMessage: '',
    timeOverNum: 3, //倒计时
  },
  //跳转到用户协议:
  toAgreements() {
    wx.redirectTo({
      url: '/pages/agreements/agreements',
    })
  },
  //租借
  toRent(e) {

    const {
      rentalDeposit
    } = this.data;
    let _this = this;
    wx.showLoading({
      title: '加载中...',
    })
    const token = wx.getStorageSync('token');
    if (token) {
      _this.getRentStatus(token).then(
        res1 => {
          if (_this.data.isDeposit) {
            //已缴纳押金
            _this.payByIsDeposit(e.detail.formId);
            wx.hideLoading();
          } else {
            if (rentalDeposit) {
              wx.hideLoading();
              wx.navigateTo({
                url: `../../pages/payDeposit/payDeposit?rentalDeposit=${this.data.rentalDeposit}`,
              })
            }
          }
        }
      );
    } else {
      wx.hideLoading();
      wx.navigateTo({
        url: '../../pages/login/login'
      });
    }



  },


  //已有押金，直接下单
  payByIsDeposit(_formId) {
    let _this = this;

    const token = wx.getStorageSync('token');
    const snNo = wx.getStorageSync('snNo');

    app.createOrder(token, '1', snNo, '3', '0', '', '', _formId).then(
      res => {
        console.log("____dj500____")

        console.log(res)
        if (res.statusCode === 200 && res.data.code == '10000') {
          if (res.data.data.orderStr == 'isDeposit') {
            wx.navigateTo({
              url: '../../pages/treasureState/treasureState?orderNo=' + res.data.data.orderNo
            })
          }
        } else {
          wx.showToast({
            title: '支付失败'
          });
        }

      }
    );
  },

  getRentIndexConf() {
    let _this = this;

    const snNo = wx.getStorageSync('snNo');

    app.http(`${baseApi}rent/getRentIndexConf?snNo=` + snNo + '&orgId=' + orgId, 'GET', {}, false).then(
      res => {
        const {
          hourlyFee,
          cappingEveryday,
          rentalDeposit,
          freeExperienceMinutes,
          powerbankThrowTime,
          buyoutOvertime
        } = res.data.data;

        if (res.data.code === '10000') {
          _this.setData({
            chargeText: `每小时${hourlyFee}元，每天${cappingEveryday}元封顶`,
            rentalDeposit: `${rentalDeposit}`,
          });

          if (freeExperienceMinutes != null && freeExperienceMinutes != '0') {
            _this.setData({
              activeTextEx: `前${freeExperienceMinutes}分钟免费，`,
            });
          }

          if (powerbankThrowTime != null && powerbankThrowTime != '0') {
            _this.setData({
              activeText: `限时免费${powerbankThrowTime}分钟`,
              // isShowActive: true,
            });
          }

        } else {

          wx.showToast({
            title: res.data.message,
          })
        }
      }
    );
  },

  getRentStatus() {
    let _this = this;

    const snNo = wx.getStorageSync('snNo');
    const token = wx.getStorageSync('token');

    return new Promise((resolve, reject) => {
      app.http(`${baseApi}token/user/getRentStatus?snNo=` + snNo, 'get', {}, true).then(
        res => {
          let timeEnd;
          const {
            isDeposit,
            status,
            orderNo,
            message,
            isUseActive
          } = res.data.data;
          if (res.data.code == '10000') {
            _this.setData({
              isDeposit: isDeposit === '1' ? true : false,
              userLeaseStatus: status,
              isShowActive: isUseActive == '0' ? true : false,
            });

            if (status == '2') { //正在租借中
              resolve(2);
              //先弹窗 => 1s后跳转
              // setTimeout(() => {
              //   wx.redirectTo({
              //     url: '../../pages/usingPowerBank/usingPowerBank'
              //   });
              // }, 0);
              // _this.setData({
              //   isPopShow: true
              // })
              this.setData({
                isPopShow: true,
                popMessage: "正在租借中..."
              })
              timeEnd = setInterval(() => {
                if (_this.data.timeOverNum < 1) {
                  clearInterval(timeEnd)
                } else {
                  _this.setData({
                    timeOverNum: _this.data.timeOverNum - 1
                  })
                }
              }, 1000)
              wx.hideLoading()
              setTimeout(() => {
                clearInterval(timeEnd)
                wx.navigateTo({
                  url: '../../pages/usingPowerBank/usingPowerBank'
                });
                this.setData({
                  isPopShow: false
                })
              }, 3500)
              return false

            } else if (status == '3') { //有未支付订单
              resolve(2);
              //先弹窗 => 1s后跳转
              wx.setStorageSync('orderNo', orderNo)
              // _this.setData({
              //   isPopShow: true
              // })
              // setTimeout(() => {
              //   wx.redirectTo({
              //     url: '../../pages/paymentOrder/paymentOrder?fromIndex=1'
              //   });
              // }, 200);


              this.setData({
                isPopShow: true,
                popMessage: message
              })
              timeEnd = setInterval(() => {
                if (_this.data.timeOverNum < 1) {
                  clearInterval(timeEnd)
                } else {
                  _this.setData({
                    timeOverNum: _this.data.timeOverNum - 1
                  })
                }
              }, 1000)
              wx.hideLoading()
              setTimeout(() => {
                clearInterval(timeEnd)
                wx.navigateTo({
                  url: '../../pages/paymentOrder/paymentOrder?fromIndex=1'
                });
                this.setData({
                  isPopShow: false
                })
              }, 3500)
              return false

            } else if (status == '9') { //设备状态异常
              resolve(2);
              this.setData({
                isPopShow: true,
                popMessage: message
              })
              timeEnd = setInterval(() => {
                if (_this.data.timeOverNum < 1) {
                  clearInterval(timeEnd)
                } else {
                  _this.setData({
                    timeOverNum: _this.data.timeOverNum - 1
                  })
                }
              }, 1000)
              wx.hideLoading()
              setTimeout(() => {
                wx.navigateTo({
                  url: '../../pages/noRent/noRent?content=' + message
                });
                this.setData({
                  isPopShow: false
                })
              }, 3500)

              return false
            } else { //停留当前页，并去掉加载中
              resolve(1);
            }
          } else {
            resolve(0);
          }
        }
      ).catch(err => {
        wx.navigateTo({
          url: '../../pages/noNet/noNet'
        });
      });
    })

  },

  //判断是否有宝可借
  getCanBorrowNum() {
    let _this = this;

    app.http(`${baseApi}getCanBorrowNum`, "GET", {
        snNo: wx.getStorageSync('snNo')
      }, false)
      .then(res => {
        // console.log(res)

        if (res.data.code == 10000) {
          if (res.data.data.isHave == '0') { //无可借充电宝
            //展示提示框，点击后跳转页面

            wx.redirectTo({
              url: '/pages/noRent/noRent?content=暂无可借充电宝'
            });
            return false

          } else {
            _this.getRentIndexConf();
          }
        }

      })
  },

  //工具栏 - 会员中心
  toMember() {
    var token = wx.getStorageSync('token');
    if (token) {
      wx.navigateTo({
        url: '../../pages/member/member'
      });
      return false

    } else {
      // wx.showLoading();
      wx.navigateTo({
        url: '../../pages/login/login'
      });
      return false

    }

  },
  onLoad: function(options) {
    console.log(options)
    app.setStora(options, '3');

  },
  onShow(options) {
    console.log(options)
    this.setData({
      timeOverNum: 3
    }) //每次进来重置计时
    let _this = this;
    wx.showLoading({
      title: "加载中...",
      mask: true
    });

    let token = wx.getStorageSync('token');


    if (token) {
      Promise.all([
        _this.getCanBorrowNum(),
        _this.getRentStatus()
      ]).then(res => {
        if (res) {
          setTimeout(() => {
            wx.hideLoading()
          }, 500)
        }
      })
      return false
    } else {
      _this.getRentIndexConf()
      setTimeout(() => {
        wx.hideLoading()
      }, 500)
      return false
    }




  },

  onHide() {
    if (this.data.isClose) {
      console.log('重新打开')
    }
  },
  onUnload() {
    setTimeout(() => {
      that.setData({
        isClose: true
      })
    }, 200)
  }
});