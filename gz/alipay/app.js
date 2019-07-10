import { baseApi } from "/utils/util"

App({
  globalData: {
    userInfo: null,   //用户信息
    token: null,      //token值
    myLocation: null,   //我的当前位置，经度纬度值
  },

  /* 保存用户信息，头像昵称 */
  getUserInfo() {
    return new Promise((resolve, reject) => {
      if (this.userInfo) resolve(this.userInfo);

      my.getAuthCode({
        scopes: 'auth_user',
        success: authcode => {
          my.getAuthUserInfo({
            success: res => {
              this.userInfo = res;
              resolve(this.userInfo);
            },
            fail: () => {
              reject({});
            },
          });
        },
        fail: (err) => {
          reject(err);
        },
      });
    });
  },

  //请求后端，支付宝是否注册，code => userID 获取userID接口
  getUserId(){
    let _this = this;
    return new Promise((resovle,reject)=>{
      //获取code
      my.getAuthCode({
        scopes: 'auth_user',
        success: (res) => {
          console.log(res);
          //code => userID
          my.httpRequest({
            url: `${baseApi}login/2/1/${res.authCode}`,
            method: 'post',
            dataType: 'json',
            success: function(res) {
              console.log(res.data.code);

              _this.put('isLogin',res.data.code == 10000 ? true : false);

              if (res.data.code == 10000) {
                //将返回的token保存
                _this.put('token',res.data.data.token);

              } else {
                //当授权失败，进入提示页面
              }
              resovle(res);
            },
            fail: function(res) {
              console.log(res)
              reject({});
            },
          });

        }
      })
    });
  },

  createOrder:function(token, chargeType, cabinetSnNo, borrowWay, isAutoRefund,
      snNo, lineConfId, formId) {
    return new Promise((resovle,reject)=>{
      my.httpRequest({
        url: `${baseApi}token/order/createOrder`,
        method: 'post',
        headers:{
          'token': token
        },
        data: {
          'chargeType': chargeType, 
          'cabinetSnNo': cabinetSnNo,
          'borrowWay': borrowWay,
          'source': '2',
          'isAutoRefund': isAutoRefund,
          'snNo': snNo,
          'lineConfId': lineConfId,
          'formId': formId
        },
        dataType: 'json',
        success: function(res) {
          console.log(res.data);
          resovle(res);
        },
        fail: function(res) {
          console.log(res);
          reject({});
        },
      });
    });
  },


  /*
  * url:      请求地址
  * method：  方式，默认get
  * data：    请求数据，默认为空
  * headers:  自定义请求头
 */
 http ( url, method='GET', data={}, needToken=false ) {
   let _headers = {};
   if(needToken) {
      _headers=  {
        'token': this.get('token')
      }
   }


  return new Promise( (resolve, reject) =>{
    my.request({
      url: url,
      data: data,
      method: method,
      headers:  _headers,
      success: (res) =>{
        resolve(res)
      },
      fail: (err) =>{
        reject(err)
      }
    })
  })
},
  
  // 缓存标识
  dtime: '_deadtime',
  /**
   * 设置缓存
   * @param k string 键值
   * @param v string 值
   * @praam t int 过期时间
   */ 
  put:function(k,v,t){
    my.setStorageSync({
      key:k,
      data:v
    })

    // 缓存有效时间 6小时
    var cacheTime = 60*60*6;

    var s = t?parseInt(t):cacheTime;    // 如果t为空，则选区默认缓存时间
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000 + s;
    var time = s>0?timestamp:'';
    my.setStorageSync({
      key:k + this.dtime,
      data:time
    })
  },
  // 获取缓存 
  get:function(k){
    var t = my.getStorageSync({
      key:k+this.dtime
    });
    var deadtime = t.data;  // 缓存失效时间
    var nowTime = Date.parse(new Date()) / 1000; // 小程序服务当前时间
    if(deadtime>nowTime){
      // a.1 未过期
      var res = my.getStorageSync({
        key: k,
      });
      var result = res.success==true?res.data:'';
      return result;
    }else{
      // a.2 时间过期
      this.remove(k);
      return false;
    }
  },
 
  // 移除缓存
  remove: function (k) {
    my.removeStorageSync({
      key:k
    });
    my.removeStorageSync({
      key:k + this.dtime
    });
  },
 
  // 清理缓存
  clear: function () {
    my.clearStorageSync()
  },

  onLaunch(options) {
    let _this = this;
    console.log('query值：', options);
    
    if (options.query.snNo != undefined) {
      _this.put('snNo',options.query.snNo);
    }

    if (options.query.orderNo != undefined) {
      _this.put('orderNo',options.query.orderNo);
    }
    
  },
  onShow(option){
    //console.log("页面回调的参数：",option);
  },
});
