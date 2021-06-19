import Taro from '@tarojs/taro'
import * as apiConstant from './apiConstant'

// const baseUrl = "http://39.103.198.184"
// https://woyaoshangxue123.com/
const baseUrl = "https://woyaoshangxue123.com"

function initJSON(str) {
  return new Promise((resolve, reject) => {
    if (typeof str == 'string') {
      try {
        var obj = JSON.parse(str);
        if (typeof obj == 'object' && obj) {
          resolve(obj)
        } else {
          resolve(str)
        }

      } catch (e) {
        console.log('error：' + str + '!!!' + e);
        reject();
      }
    } else {
      resolve(str)
    }
  })

}
/**
 * @method 微信登录获取code
 * @param 无参数
 */
export const login = () => {
  return new Promise((resolve, reject) => {
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          console.log()
          resolve(res.code)
        } else {
          console.log('登录失败！' + res.errMsg)
          reject(res.errMsg)
        }
      }
    })
  })
}
/* 自动登录 */
var userLogin = async () => {


  const code = await login();
  const res: any = await request('USERLOGIN', {
    authCode: code,
    referrerUserId: wx.getStorageSync('ivtUid') || ''
  }, {}, {})
  return new Promise(resolve => {
    wx.setStorageSync('token', res.data.token)
    Taro.getApp().onStart()
    resolve(res.data.token)
  })
}
//
var checkSession = () => {
  return new Promise(resolve => {
    wx.checkSession({
      success() {
        console.log('登录没有过期')
        resolve()
        //session_key 未过期，并且在本生命周期一直有效
      },
      fail: async () => {
        await userLogin()
        resolve()
      }
    })
  })
}
/**
 * @method stringify 将对象转换成key1=value1&key2=value2格式
 * @param {Object} obj 传递对象
 */
function stringify(obj) {
  var tempArr = []
  for (var i in obj) {
    tempArr.push(i + '=' + encodeURIComponent(obj[i]))
  }
  return tempArr.join('&')
}
/**
 * @method parse 将url参数转换成对象
 * @param {String} str 传递过来的参数解析为对应的obj
 */
function parse(str) {
  var obj = {}
  if (typeof str === 'string') {
    if (str.indexOf('?') > -1) {
      str = str.split('?')[1]
    }
    var arr = str.split('&')
    for (var i = 0; i < arr.length; i++) {
      var tempStr = arr[i].split('=')
      obj[tempStr[0]] = decodeURIComponent(tempStr[1])
    }
  }
  return obj
}


const request = async (url, body = {}, data = {}, _options) => {
  let options = { type: 'POST', ..._options }
  let _headers = {}

  if (url !== 'USERLOGIN') {
    let TOKEN = wx.getStorageSync('token')
    if (!TOKEN) {
      TOKEN = await userLogin()
      console.log(TOKEN)
    } else {
      await checkSession()
      TOKEN = wx.getStorageSync('token')
    }
    _headers.token = TOKEN
  }
  let shortData = stringify(data)
  let concatUrl = shortData ? '?' + stringify(data) : ''

  return new Promise((resovle, reject) => {
    let tempUrl = baseUrl + apiConstant[url] + concatUrl
    Taro.request({
      url: tempUrl, //仅为示例，并非真实的接口地址
      data: body,
      method: options.type,
      header: {
        'content-type': 'application/json',// 默认值
        ..._headers
      },
      success: (res) => {
        // console.log(res.data)
        initJSON(res.data.data).then(r => {
          resovle({ data: r, res: res.data })
        })
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}


export default request