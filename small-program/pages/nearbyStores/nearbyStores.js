import { baseApi, testApi } from "../../utils/util"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude: '',
    latitude: '',
    pageOffset: 0,
    storesList: [],
    scrollViewHeight: ''
  },

  onLoad: function (options) {
    this.setData({
      longitude: options.longitude,
      latitude: options.latitude
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const { longitude, latitude, pageOffset } = this.data;

    wx.getSystemInfo({
      success: res => {
        this.setData({
          scrollViewHeight: res.windowHeight
        })
      }
    })
    this.getNearbyStoresData({
      from: 0,
      pageNum: 10,
      longitude,
      latitude
    }).then(res => {
      const storesList = res;
      this.setData({
        storesList,
        pageOffset: pageOffset + 1
      })
    })
  },

  getNearbyStoresData: function(params) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${baseApi}device/getNearCabinets`,
        method: 'POST',
        data: {
          from: params.from,
          pageNum: params.pageNum,
          filter: params.latitude,
          filter2: params.longitude
        },
        success: function(res) {
          if (res.data.code === '10000' && res.data && res.data.data.content.length) {
            const storesList = res.data.data.content;
            resolve(storesList)
          } else {
            resolve([])
          }
        },
        fail: function(err) {
          reject(err)
        }
      })
    })
  },

  scrollToBottom: function() {
    const { longitude, latitude, pageOffset, storesList } = this.data;

    this.getNearbyStoresData({
      from: pageOffset,
      longitude,
      latitude
    }).then(res => {
      this.setData({
        storesList: [...storesList, ...res],
        pageOffset: pageOffset + 1
      })
    })
  },

  enterPlace: function(e) {
    // console.log(this.data.storesList[e.target.dataset.key])
  
    const { longitude, latitude, shopName, detailAddr } = this.data.storesList[e.target.dataset.key]

    wx.openLocation({
      latitude: Number(latitude),
      longitude: Number(longitude),
      name: shopName,
      address: detailAddr,
      success: res => {
        console.log(res)
      }
    })
  },

  loadImgErr: function(e) {
    const { storesList } = this.data;

    this.setData({
      storesList: storesList.map(item => ({
        ...item,
        shopImg: e.target.dataset.id === item.id ? '../../assets/images/shopImgAd.png' : item.shopImg
      }))
    })
  }
})

  // ../../ assets / images / shopimg_default.png