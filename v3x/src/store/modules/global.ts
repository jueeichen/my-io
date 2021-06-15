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
}

const actions = {
  setNavHeight(context, navHeight) {
    context.commit('SET_NAVHEIGHT', navHeight)
  },
  async getProfile(context) {
    const data: any = await $api('GETCOMMONCONF', {}, {}, {})
    context.commit('SET_COMMONCONF', data.data)
    // console.log(context)
  },
  async getUserInfo(context) {
    const data: any = await $api('GETUSERINFO', {}, {}, {})
    context.commit('GET_USERINFO', data.data)
    // console.log(context)
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
      resolve(data.data)
    })
    // console.log(context)
  },
  //我的订单列表
  getOrderList(context) {
    return new Promise(async (resolve) => {
      const data: any = await $api('GETORDERLIST', {
        status:1
      }, {
        pageNum: 1,
        pageSize: 10
      }, {})
      console.log("payOrder=>", context)
      console.log("payOrder", data)
      resolve(data.data)
    })
    // console.log(context)
  }
}

const getters = {

}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}