const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const urlToObj = str => {
  let obj = {};
  let arr2 = str.split("&");
  for (let i = 0; i < arr2.length; i++) {
    let res = arr2[i].split("=");
    obj[res[0]] = res[1];
  }
  return obj;
}


const request = (url, data = {}, method = "GET", needToken = true) => {
  const token = wx.getStorageSync('token');
  let _this = this;
  let _headers = {};
  if (url.indexOf('/token')!=-1) {
    // console.log("需要token")
    if (token) {
      _headers = {
        'token': token
      }
    } else {
      // console.log("没有token")
      wx.navigateTo({
        url: '../../pages/login/login'
      });
    }

  }
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      data,
      method,
      header: _headers,
      success: function (res) {
        resolve(res)
      },
      fail: function (err) {
        reject(err)
      }
    })
  })
}

const redirect = (url) => {

  //判断页面是否需要登录
  if (false) {
    wx.redirectTo({
      url: '/pages/auth/login/login'
    });
    return false;
  } else {
    wx.redirectTo({
      url
    });
  }
}


const showErrorToast = (title) => {
  wx.showToast({
    title
  })
}
//js 正则判断字符串是否为字母或数字
const checkNum = (value) => {
  var Regx = /^[A-Za-z0-9]*$/;
  if (Regx.test(value)) {
    return true;
  } else {
    return false;
  }
}
//节流:
function throttle(fn, gapTime) {
  if (gapTime == null || gapTime == undefined) {
    gapTime = 1500
  }

  let _lastTime = null
  return function () {
    let _nowTime = + new Date()
    if (_nowTime - _lastTime > gapTime || !_lastTime) {
      fn()
      _lastTime = _nowTime
    }
  }
}




// const baseApi = "http://djts.ygs001.com/"; //status500的接口

const baseApi = "https://cssmall.ygs001.com/"; //测试
// const baseApi = "https://test-small.tnwcdb.com/" //准生产
// const baseApi = "https://small.tnwcdb.com/" //生产

const appId = "2019030163431465"; //appId
const mapKey = "VC6BZ-X2TWR-USWWP-WZQQV-WJNLK-BEFKX";
const hotLine = 4008521453;
const orgId = 64;
// const orgId = 95;
// const orgId = 10001;
// const orgId = 102;





module.exports = {
  formatTime,
  urlToObj,
  baseApi,
  appId,
  mapKey,
  hotLine,
  orgId,
  showErrorToast,
  request,
  checkNum,
  throttle
}