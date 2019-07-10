import {
  baseApi,
  urlToObj,
  mapKey,
  debounce
} from "../../utils/util"
import QQMapWX from "../../utils/qqmap-wx-jssdk.min.js"
const app = getApp()

const qqmapsdk = new QQMapWX({
  key: mapKey
});


Page({
  data: {
    styleString: '',
    longitude: '',
    latitude: '',
    scale: 16, //缩放级别
    userInfo: {
      nickName: '',
      avatarUrl: '/assets/images/avatar.png'
    },
    //其他目的标记点
    markers: [], //标记点部分集合
    targetChargingStatus: false, //充电宝弹窗状态
    shopDetails: {}, //选中某个充电宝数据信息
    usingStatus: 0, //用户用宝状态： 0：没使用； 1：使用中； 2：有未支付订单；
    orderNo: '',
    searchCover: false,
    enterSearchInput: false,
    searchInputValue: '',
    searchInputPlaceList: [],
    showPlaceList: false,
    selectedPlace: {},
    isShowActive: false,
    isShowUseIng: false,
    isShowUseIng1:false
  },
  //跳转到付款页面;
  toPayOrder() {
    wx.navigateTo({
      url: '/pages/paymentOrder/paymentOrder?orderNo=' + this.data.orderNo
    });
  },
  toMemberLease() {
    wx.navigateTo({
      url: '/pages/orderDetail/orderDetail?orderNo=' + this.data.orderNo
    });
  },
  //获取页面活动状态：
  isShowActivePic() {
    app.http(`${baseApi}/token/user/getMapIndexConf`, "GET", {}, true).then(
      res => {
        console.log(res.data.data.isUseActive);
        if (res.data.data.isUseActive == 1) {
          this.setData({
            isShowActive: true
          })
        } else {
          this.setData({
            isShowActive: false
          })
        }
        this.setData({
          usingStatus: res.data.data.status == undefined ? '0' : res.data.data.status,
          orderNo:res.data.data.orderNo
        })
        this.setData({
          isShowUseIng: this.data.usingStatus == "1" ? true : false,
          isShowUseIng1: this.data.usingStatus == "2" ? true : false,
          styleString: this.data.isShowActive ? "" : "transform:translateY(-100rpx)"
        })

      }
    )
  },
  onReady(e) {
    // 使用 wx.createMapContext 获取 map 上下文
    this.mapCtx = wx.createMapContext('map')
  },
  enterPlace: function(e) {
    console.log(this.data.shopDetails)


    const {
      longitude,
      latitude,
      title,
      detailAddr
    } = this.data.shopDetails

    wx.openLocation({
      latitude: Number(latitude),
      longitude: Number(longitude),
      name: title,
      address: detailAddr,
      success: res => {
        console.log(res)
      }
    })
  },
  onLoad(options) {
    const {
      longitude,
      latitude
    } = options;

    if (longitude) {
      this.setData({
        longitude,
        latitude
      }, () => {
        this.renderMarkers({
          longitude,
          latitude
        })
      })
    } else {
      this.enterCurrentLocation()
    }
    // let userInfo = JSON.parse(wx.getStorageSync('userInfo')) ;
    // if (userInfo.avatarUrl == undefined || userInfo.avatarUrl == null){
    //   userInfo.avatarUrl = '/assets/images/avatar.png'
    // }

    // this.setData({ userInfo })
  },

  onShow: function() {
    if (wx.getStorageSync('userInfo')) {
      const user = JSON.parse(wx.getStorageSync('userInfo'))

      let userInfo = {
        nickName: user.nickName,
        avatarUrl: user.avatarUrl ? user.avatarUrl : '/assets/images/avatar.png'
      }


      this.setData({
        userInfo
      })
      if (wx.getStorageSync('token')){
        this.isShowActivePic()
      }

    }


  },

  onImageErr: function(e) {
    const {
      shopDetails
    } = this.data;

    this.setData({
      shopDetails: {
        ...shopDetails,
        shopLogo: '../../assets/images/shopImgAd.png'
      }
    })
  },

  enterMember: function() {
    wx.showLoading({
      title: '加载中...',
      mask: true
    })

    wx.navigateTo({
      url: '../../pages/member/member',
    })
    wx.hideLoading()
  },

  enterQuestions: function() {
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    setTimeout(() => {
      wx.hideLoading()
    }, 2000)
    wx.navigateTo({
      url: '../../pages/memberHelp/memberHelp',
    })

  },

  enterNearbyStores: function() {
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    const {
      longitude,
      latitude
    } = this.data;

    if (!longitude) {
      this.getCurrentLocation().then(res => {
        wx.navigateTo({
          url: `/pages/nearbyStores/nearbyStores?longitude=${res.longitude}&&latitude=${res.latitude}`
        })
      })
      wx.hideLoading()
    } else {
      wx.navigateTo({
        url: `/pages/nearbyStores/nearbyStores?longitude=${longitude}&&latitude=${latitude}`
      })
      wx.hideLoading()
    }
  },

  bindfocusSearchInput: function() {
    this.setData({
      enterSearchInput: true
    })
  },

  getCurrentLocation: function() {
    return new Promise((resolve, reject) => {
      wx.getLocation({
        type: 'gcj02',
        success(res) {
          resolve(res)
        },
        fail(err) {
          reject(err)
        }
      })
    })
  },

  getMarkers: function(params) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${baseApi}device/searchCabinets?latitude=${params.latitude}&longitude=${params.longitude}`,
        success: res => {
          if (res.statusCode === 200 && res.data.code === '10000') {
            resolve(res.data.data.cabinets)
          } else {
            reject(res.errMsg)
          }
        },
        fail: err => {
          reject(err)
        }
      })
    })
  },

  renderMarkers(params) {
    this.getMarkers(params).then(res => {
      this.setData({
        markers: res.map(item => ({
          id: item.id,
          latitude: item.latitude,
          longitude: item.longitude,
          title: item.shopName,
          width: 50,
          height: 53,
          callout: {
            borderWidth: 0
          },
          iconPath: '/assets/images/markers.png',
          shopInfo: item
        }))
      })
    })
  },

  markertap(e) {
    const {
      markers
    } = this.data;
    const shopId = e.markerId;
    const shopInfo = this.data.markers.map(i => i.id).includes(shopId) ? this.data.markers.filter(item => item.id === shopId)[0].shopInfo : {};

    this.setData({
      targetChargingStatus: true,
      searchCover: false,
      showPlaceList: false,
      shopDetails: {
        shopLogo: shopInfo.shopImg || "",
        title: shopInfo.shopName || "",
        distance: shopInfo.juli || undefined,
        detailAddr: shopInfo.detailAddr || "",
        businessHours: shopInfo.businessHours || "",
        canBorrowNum: shopInfo.canBorrowNum || undefined,
        canBackNum: shopInfo.canBackNum || undefined,
        longitude: shopInfo.longitude,
        latitude: shopInfo.latitude
      },
      markers: markers.map(item => ({
        ...item,
        width: item.id === shopId ? 60 : 50,
        height: item.id === shopId ? 60 : 53,
      }))
    })
  },
  onMapTap() {
    this.setData({
      targetChargingStatus: false,
      shopDetails: {},
      searchCover: false,
      showPlaceList: false,
      enterSearchInput: false,
      searchInputValue: '',
      searchInputPlaceList: [],
      markers: this.data.markers.map(item => ({
        ...item,
        width: 50,
        height: 53,
      }))
    })
  },
  onRegionchange(e) {
    if (e.type == 'end' && e.causedBy == 'drag') {
      this.mapCtx.getCenterLocation({
        type: 'gcj02',
        success: res => {
          this.setData({
            targetChargingStatus: false,
            latitude: `${res.latitude}`,
            longitude: `${res.longitude}`
          })

          this.renderMarkers({
            longitude: res.longitude,
            latitude: res.latitude
          })
        }
      })
    }
  },

  enterCurrentLocation: function() {
    this.getCurrentLocation().then(res => {
      this.setData({
        longitude: res.longitude,
        latitude: res.latitude,
      })
    }).then(() => {
      const {
        longitude,
        latitude
      } = this.data
      this.renderMarkers({
        longitude,
        latitude
      })
    })
  },

  enterSearchCoverView: function() {
    this.getCurrentLocation().then(res => {
      const {
        longitude,
        latitude
      } = res;

      wx.navigateTo({
        url: `/pages/mapSearch/mapSearch?longitude=${longitude}&&latitude=${latitude}`,
      })
    })
  },


  scanCode: function() {
    // var token = wx.getStorageSync('token');
    // if (!token) {
    //   wx.navigateTo({
    //     url: '../../pages/login/login'
    //   });
    //   return false}
    wx.showLoading({
      title: "加载中...",
      mask: true
    })
    wx.scanCode({
      success: res => {

        const {
          type,
          snNo
        } = urlToObj(res.result.split('?')[1]);

        if (snNo) {
          wx.setStorageSync('snNo', snNo);
          if (type == '1') { //跳转到宝充首页
            wx.navigateTo({
              url: '../../pages/index/index'
            });
          } else if (type == '2') { //跳转到线充首页
            wx.navigateTo({
              url: '../../pages/rentChargingline/rentChargingline'
            });
          } else {
            wx.showToast({
              title: '无效的二维码'
            });
          }
        } else {
          wx.showToast({
            title: '扫码失败',
          })
        }
        wx.hideLoading()
      },
      fail: err => {
        wx.showToast({
          title: '扫码失败'
        })
        wx.hideLoading()
      }
    })
  }


})