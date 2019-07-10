/**
 * 用户相关服务
 */
import { baseApi, orgId, urlToObj, request } from "./util"


/**
 * Promise封装wx.checkSession
 */
function checkSession() {
  return new Promise(function (resolve, reject) {
    wx.checkSession({
      success: function () {
        resolve(true);
      },
      fail: function () {
        reject(false);
      }
    })
  });
}

/**
 * Promise封装wx.login
 */
function login() {
  return new Promise(function (resolve, reject) {
    wx.login({
      success: function (res) {
        if (res.code) {
          resolve(res);
        } else {
          reject(res);
        }
      },
      fail: function (err) {
        reject(err);
      }
    });
  });
}

/**
 * 调用微信登录
 */
const loginByWeixin = (userInfo) => {

  return new Promise(function (resolve, reject) {
    return login().then((res) => {
      wx.request({
        url: `${baseApi}login/1/${orgId}/${res.code}`,
        method: 'POST',
        success:  res => {
          if (res.statusCode === 200 && res.data.code === '10000') {
            wx.setStorageSync('userInfo', JSON.stringify(userInfo));
            wx.setStorageSync('token', res.data.data.token);

            resolve(true)
          } else {  
            reject(res.errMsg);
          }
        },
        fail: err => reject(err)
      })
    }).catch((err) => {
      reject(err);
    })
  });
}

/**
 * 判断用户是否登录
 */
const checkLogin = () => {
  return new Promise(function (resolve, reject) {
    if (wx.getStorageSync('userInfo') && wx.getStorageSync('token')) {
      checkSession().then(() => {
        resolve(true);
      }).catch(() => {
        reject(false);
      });
    } else {
      reject(false);
    }
  });
}

module.exports = {
  loginByWeixin,
  checkLogin,
};