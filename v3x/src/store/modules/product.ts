// 产品相关的接口以及最新数据
import Taro from '@tarojs/taro'
import $api from '../../api'
const systenInfo = Taro.getSystemInfoSync()
const pxRate = 750 / systenInfo.windowWidth
const navHeight = 88 + systenInfo.statusBarHeight * pxRate
const tabsHeight = navHeight / pxRate - 5
// console.log(navHeight,pxRate,tabsHeight)
const state = {
  numbers: [1, 2, 3],
  token: '123',
  navHeight: navHeight,
  tabsHeight: tabsHeight,
  list: [],
  list_1: [],
  list_2: [],
  pageNum: 0,
  pageNum_1: 0,
  pageNum_2: 0,
  pageSize: 10,
  showBottom: false,
  showBottom_1: false,
  showBottom_2: false,
}

const mutations = {
  SET_PAGENUM(state, pageNum) {
    state.pageNum = pageNum
  },
  SET_SHOWBOTTOM(state, showBottom) {
    state.showBottom = showBottom
  },
  ADD_NUMBER(state, payload) {
    state.numbers.push(payload)
  },
  SET_NAVHEIGHT(state, navHeight) {
    state.navHeight = navHeight
  },
  GETPRODUCTLIST(state, list) {
    state.list = list
  },
  GETPRODUCTLIST_1(state, list) {
    state.list_1 = list
  },
  GETPRODUCTLIST_2(state, list) {
    state.list_2 = list
  },
}

const actions = {
  addNumber(context, number) {
    console.log('ADD_NUMBER——A')
    context.commit('ADD_NUMBER', number)
  },
  setNavHeight(context, navHeight) {
    context.commit('SET_NAVHEIGHT', navHeight)
  },
  setPageNum(context, number) {
    context.commit('SET_PAGENUM', number)
  },
  setShowBottom(context, showBottom) {
    context.commit('SET_SHOWBOTTOM', showBottom)
  },
  async getList(context, obj) {
    // if (obj.hasOwnProperty('showBottm')) {
    //   context.dispatch('setShowBottom', obj.showBottom)
    // }
    // if (obj.hasOwnProperty('page')) {
    //   context.dispatch('setPageNum', obj.page)
    // }
    // if (context.state.showBottom) return
    // let page = context.state.pageNum
    const data: any = await $api('GETINDEXPRODUCTLIST', {}, { pageNum: obj.page, pageSize: obj.pageSize }, {})
    // let newList = data.data.productInfos
    // let oldList = context.state.list
    // let newArr
    // if (page == data.data.pageNum) {
    //   if (newList.length > 0) {
    //     newArr = page == 1 ? newList : [...oldList, ...newList]
    //     context.commit('GETPRODUCTLIST', newArr)
    //     context.dispatch('setPageNum', ++page)
    //     console.log(context)
    //     wx.stopPullDownRefresh();
    //   } else {
    //     //加载完毕 显示到底了
    //     context.dispatch('setShowBottom', true)
    //     wx.stopPullDownRefresh();
    //   }
    // }
    return new Promise(resolve => {
      resolve(data.data)
    })
  },
  async getListByType(context, obj) {
    // if (obj.hasOwnProperty('showBottm')) {
    //   context.dispatch('setShowBottom', obj.showBottom)
    // }
    // if (obj.hasOwnProperty('page')) {
    //   context.dispatch('setPageNum', obj.page)
    // }
    // if (context.state.showBottom) return
    // let page = context.state['pageNum_' + obj.type]
    const data: any = await $api('GETPRODUCTLISTBYTYPE', { productType: obj.type }, { pageNum: obj.page, pageSize: obj.pageSize }, {})
    console.log(data)

    // let newList = data.data.productInfos
    // let oldList = context.state['list_' + obj.type]
    // if (page == data.data.pageNum) {
    //   if (newList.length > 0) {
    //     let newArr = page == 1 ? newList : [...oldList, ...newList]
    //     context.commit('GETPRODUCTLIST_' + obj.type, newArr)
    //     context.dispatch('setPageNum', ++page)
    //     console.log(context)
    //     wx.stopPullDownRefresh();
    //   } else {
    //     //加载完毕 显示到底了
    //     context.dispatch('setShowBottom', true)
    //     wx.stopPullDownRefresh();
    //   }
    // }
    return new Promise(resolve => {
      resolve(data.data)
    })
  }
}

const getters = {
  getNumbers(state) {
    return state.numbers
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}