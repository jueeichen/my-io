import Taro from '@tarojs/taro'
import $api from '../../api'

const systenInfo = Taro.getSystemInfoSync()
const pxRate = 750 / systenInfo.windowWidth
const navHeight = 88 + systenInfo.statusBarHeight * pxRate
const tabsHeight = navHeight / pxRate - 5
// console.log(navHeight,pxRate,tabsHeight)
const state = {
  navHeight: navHeight,
  tabsHeight: tabsHeight,
  commonConf: {},
  commonConfImage: {},
  userInfo: {},
  couponList: [],
  confirmData: {},
  qrcode:'',
}

const mutations = {
  SET_COUPONLIST(state, couponList) {
    state.couponList = couponList
  },
  SET_NAVHEIGHT(state, navHeight) {
    state.navHeight = navHeight
  },
  SET_COMMONCONF(state, data) {
    state.commonConf = data
    Taro.setStorageSync('commonConf', data)
  },
  SET_COMMONCONFIMAGE(state, data) {
    state.commonConfImage = data
    Taro.setStorageSync('commonConfImage', data)
  },
  GET_USERINFO(state, data) {
    state.userInfo = data
    Taro.setStorageSync('userInfo', data)
  },
  SET_CONFIRMDATA(state, data) {
    state.confirmData = data
  },
  SET_QRCODE(state, data) {
    state.qrcode = data
  },
}

const actions = {
  setConfirmData(context, data) {
    context.commit('SET_CONFIRMDATA', data)
  },
  setNavHeight(context, navHeight) {
    context.commit('SET_NAVHEIGHT', navHeight)
  },
  getProfile(context) {
    return new Promise(async (resolve) => {
      const data: any = await $api('GETCOMMONCONF', {}, {}, {})
      context.commit('SET_COMMONCONF', data.data)
      resolve(data.data)
    })
    // console.log(context)
  },
  getUserInfo(context) {
    return new Promise(async (resolve) => {
      const data: any = await $api('GETUSERINFO', {}, {}, {})
      context.commit('GET_USERINFO', data.data)

      resolve(data.data)
    })
  },
  getCommonConfImage(context, type) {
    return new Promise(async (resolve) => {
      const data: any = await $api('GETCOMMONCONFIMAGE', { type }, {}, {})
      context.commit('SET_COMMONCONFIMAGE', data.data)
      console.log(context)
      resolve(data.data)
    })
    // console.log(context)
  },
  //获取我的优惠券列表
  getCouponList(context, obj) {
    return new Promise(async (resolve) => {
      const data: any = await $api('GETCOUPONLIST', { status: obj.status, couponType: obj.couponType }, { pageNum: obj.pageNum, pageSize: obj.pageSize }, {})
      context.commit('SET_COUPONLIST', data.data.couponInfos)
      console.log(context)
      resolve(data.data)
    })
    // console.log(context)
  },
  //领取优惠券
  receiveCoupon(context, obj) {
    return new Promise(async (resolve) => {
      const data: any = await $api('RECEIVECOUPON', { couponId: obj.couponId }, {}, {})
      console.log(context)
      resolve(data.data)
    })
    // console.log(context)
  },
  //获取积分明细
  receiveCoupon1(context, obj) {
    return new Promise(async (resolve) => {
      const data: any = await $api('RECEIVECOUPON', { couponId: obj.couponId }, {}, {})
      console.log(context)
      resolve(data.data)
    })
    // console.log(context)
  }
  ,
  //获取产品详情
  getProductDetailById(context, obj) {
    return new Promise(async (resolve) => {

      const data: any = await $api('GETPRODUCTDETAILBYID', { id: obj.id }, {}, {})

      console.log("产品详情", data)
      resolve(data.data)
    })
    // console.log(context)
  },
  //生成订单
  createOrder(context, obj) {
    return new Promise(async (resolve) => {
      const data: any = await $api('CREATEORDERLEARN', {
        productId: obj.productId,
        specialitiesName: obj.specialitiesName,
        signuperName: obj.signuperName,
        signuperMobile: obj.signuperMobile,
        signupCouponDetailId: obj.signupCouponDetailId
      }, {}, {})
      console.log("context=>", context)
      console.log("产品详情", data)
      resolve(data.data)
    })
    // console.log(context)
  },
  //支付订单
  payOrder(context, obj) {
    return new Promise(async (resolve) => {
      const data: any = await $api('PAYORDER', {
        orderNo: obj.orderNo
      }, {}, {})
      console.log("payOrder=>", context)
      console.log("payOrder", data)
      const params = JSON.parse(data.data.orderStr);
      delete params.appId;

      const res = await context.dispatch("wxPay", params);
      resolve(res)
    })
    // console.log(context)
  },
  //我的订单列表
  getOrderList(context, obj) {
    return new Promise(async (resolve) => {
      const data: any = await $api('GETORDERLIST', {
        status: obj.status
      }, {
        pageNum: 1,
        pageSize: 10
      }, {})
      console.log("payOrder=>", context)
      console.log("payOrder", data)
      resolve(data.data)
    })
    // console.log(context)
  },
  //调用微信支付
  wxPay(context, obj) {
    return new Promise((resolve, reject) => {
      console.log("obj=>", obj)

      wx.requestPayment({
        timeStamp: obj.timeStamp,
        nonceStr: obj.nonceStr,
        package: obj.package,
        signType: obj.signType,
        paySign: obj.paySign,
        success: (res) => {
          console.log(res)
          resolve(res)
          wx.navigateTo({
            url: '/pages/myOrder/index?id=2'
          });
        },
        fail: (res) => {
          console.log(res)
          console.log(context)
          reject(res)
          // this.triggerEvent("onReLoad",{})

        },
      })
    })
    // console.log(context)
  },
  //积分商城数据：
  // GETACCOUNTPOINT
  getAccountPoint(context) {
    return new Promise(async (resolve) => {
      const data: any = await $api('GETACCOUNTPOINT', {
      }, {}, {})
      console.log("getAccountPoint=》", data)
      resolve(data.data)
    })
    // console.log(context)
  },
  //积分商城列表：
  // GETACCOUNTPOINT
  getAccountList(context, obj) {
    return new Promise(async (resolve) => {
      const data: any = await $api('GETACCOUNTPOINTDETAILBYTYPE', {
        type: obj.type
      }, {
        pageNum: 1,
        pageSize: 10
      }
        , {})
      console.log("getAccountList=》", data)
      resolve(data.data)
    })
    // console.log(context)
  },
  //
  //重新选择优惠券
  // SELECTCOUPON
  selectCounpon(context, obj) {
    return new Promise(async (resolve) => {
      const data: any = await $api('SELECTCOUPON', {
        orderNo: obj.orderNo,
        tuitionCouponDetailId: obj.tuitionCouponDetailId
      }, {}, {})
      console.log("selectCounpon=》", data)
      resolve(data.data)
    })
    // console.log(context)
  },
  //  CANCELORDER
  cancelLorder(context, obj) {
    return new Promise(async (resolve) => {
      const data: any = await $api('CANCELORDER', {
        orderNo: obj.orderNo
      }, {}, {})
      console.log("selectCounpon=》", data)
      resolve(data.data)
    })
    // console.log(context)
  },
  //
  exchangeCoupon(context, obj) {
    return new Promise(async (resolve) => {
      const data: any = await $api('EXCHANGECOUPON', {
        couponId: obj.couponId,
        exchangeNum: obj.exchangeNum
      }, {}, {})
      console.log("selectCounpon=》", data)
      resolve(data)
    })
    // console.log(context)
  },
  decryptPhone(context, obj) {
    return new Promise(async (resolve) => {
      const data: any = await $api('DECRYPTPHONE', {
        encryptedData: obj.encryptedData,
        iv: obj.iv
      }, {}, {})
      console.log("decryptPhone=》", data.res)
      resolve(data.res)
    })
  },
  //CGETCERTFLOW 拿证流程
  getCertFlow(context) {
    return new Promise(async (resolve) => {
      const data: any = await $api('GETCERTFLOW', {
      }, {}, {})
      console.log("CGETCERTFLOW=》", data.res)
      resolve(data.data)
    })
  },
//GETMINIQRCODE
getMiniQrcode(context) {
  return new Promise(async (resolve) => {
    const data: any = await $api('GETMINIQRCODE', {
    }, {}, {})
    console.log("getMiniQrcode=》", data.res)
    context.commit('SET_QRCODE', data.data.qrcodeUrl)

    resolve(data.data)
  })
},

}
// 
const getters = {

}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}