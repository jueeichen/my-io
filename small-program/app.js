import {
  baseApi,
  orgId,
  urlToObj,
  request
} from "./utils/util"
import {
  checkLogin,
  login,
  loginByWeixin
} from "./utils/user"

App({
  globalData: {

  },

  createOrder: function(token, chargeType, cabinetSnNo, borrowWay, isAutoRefund,
    snNo, lineConfId, formId) {
    return new Promise((resovle, reject) => {
      let data = {
        'chargeType': chargeType,
        'cabinetSnNo': cabinetSnNo,
        'borrowWay': borrowWay,
        'source': '1',
        'isAutoRefund': isAutoRefund,
        'snNo': snNo,
        'lineConfId': lineConfId,
        'formId': formId
      };

      request(`${baseApi}token/order/createOrder`, data, 'POST').then(
        res => {
          resovle(res);
        }
      );

    });
  },


  /*
   * url:      请求地址
   * method：  方式，默认get
   * data：    请求数据，默认为空
   * headers:  自定义请求头
   */
  http(url, method = 'GET', data = {}, needToken = false) {
    let _this = this;
    let _headers = {};
    let token = wx.getStorageSync('token')
    if (url.indexOf('/token') !== -1) {
      console.log("需要token")
      if (token) {
        _headers = {
          'token': token
        }
      } else {
        wx.navigateTo({
          url: '../../pages/login/login'
        });
      }

    } else {
      console.log("不需要token")
    }

    // if (needToken) {
    //   _headers = {
    //     'token': wx.getStorageSync('token')
    //   }
    // }
    console.log('http请求，url=' + url + ',method=' + method + ',data=' + data + ',needToken=' + needToken);

    return new Promise((resolve, reject) => {
      wx.request({
        url: url,
        data: data,
        method: method,
        header: _headers,
        success: (res) => {
          console.log('http请求返回：' + res.data.code);
          if (res.data.code == '10003') {
            wx.showToast({
              title: '网络异常，请稍后重试'
            });
            //当后端token不存在了，此处重新请求授权
            wx.navigateTo({
              url: '../../pages/login/login'
            });
          }

          resolve(res);
        },
        fail: (err) => {
          reject(err);
          console.log(err)
          wx.navigateTo({
            url: '../../pages/noNet/noNet',
          })
        },
        complete: (err) => {
          // wx.hideLoading();
        }
      })
    })
  },


  onLaunch(options) {
    const updateManager = wx.getUpdateManager();
    wx.getUpdateManager().onUpdateReady(function() {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })
    //this.setStora(options, '1');
    // if (options.query && options.query.q) {
    //   let url = decodeURIComponent(options.query.q);
    //   console.log(url)
    //   let i = url.indexOf("?");
    //   let urlStr = url.substring(i + 1, url.length);
    //   wx.setStorageSync('snNo', urlToObj(urlStr).snNo)
    // }

    // if (options.query && options.query.snNo) {
    //   wx.setStorageSync('snNo', options.query.snNo)
    // }

    // if (options.query && options.query.orderNo) {
    //   wx.setStorageSync('orderNo', options.query.orderNo)
    // }

  },

  setStora(options, type) {
    console.log(options);
    // let str = JSON.stringify(options) 
    // wx.showModal({
    //   title: type,
    //   content: str
    // })
    if (options && options.q) {
      let url = decodeURIComponent(options.q);
      console.log(url)
      let i = url.indexOf("?");
      let urlStr = url.substring(i + 1, url.length);
      wx.setStorageSync('snNo', urlToObj(urlStr).snNo)
    }

    if (options && options.snNo) {
      wx.setStorageSync('snNo', options.snNo)
    }

    if (options && options.orderNo) {
      wx.setStorageSync('orderNo', options.orderNo)
    }
  },

  onShow(options) {
    //console.log("页面回调的参数：",option);
    console.log("场景值")
    console.log(options)
    console.log(options.scene)
    if (options.scene == "1089" || options.scene == "1090" || options.scene == "1074") {
     
    }
  },

})