import {
  baseApi,
  testApi
} from "../../utils/util"
import QQMapWX from "../../utils/qqmap-wx-jssdk.min.js"

const app = getApp()

const qqmapsdk = new QQMapWX({
  key: 'VC6BZ-X2TWR-USWWP-WZQQV-WJNLK-BEFKX'
});

Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude: '',
    latitude: '',
    scale: 16,
    searchInputValue: '',
    searchInputPlaceList: [],
    markers: [],
    showSearchIcon: true,
    searchInputFocus: false
  },
  onRegionchange(e) {
    if (e.type == 'end' && e.causedBy == 'drag') {
      this.mapCtx.getCenterLocation({
        type: 'gcj02',
        success: res => {
          wx.showLoading({
            title: '加载中...',
            mask: true
          })
          this.setData({
            latitude: `${res.latitude}`,
            longitude: `${res.longitude}`
          })
          console.log(this.data.latitude + ',' + this.data.longitude)
          this.getPlaceDataByLacation({
            latitude: this.data.latitude,
            longitude: this.data.longitude
          }).then(
            res => {
              console.log(res)
              
              // this.setData({
              //   searchInputValue: res.result.address
              // })
              setTimeout(()=>{
                wx.hideLoading()
            
                    this.getPoiList({
                      longitude:this.data.longitude,
                      latitude:this.data.latitude
                    }).then(poiRes => {
                      const poiList = poiRes.result.pois && poiRes.result.pois.length ? poiRes.result.pois : [];

                      this.setData({
                        searchInputPlaceList: poiList.map((item, i) => ({
                          ...item,
                          selected: i === 0 ? true : false
                        })),
                        markers: [poiList.map(item => ({
                          id: item.id,
                          latitude: item.location.lat,
                          longitude: item.location.lng,
                          width: 17,
                          height: 32,
                          callout: {
                            borderWidth: 0
                          },
                          iconPath: '../../assets/images/marker.png'
                        }))[0]]
                      })
                    })
                  
                
              },500)
             
            }
          )
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onReady() {
    this.mapCtx = wx.createMapContext('mapSearch')
  },
  onLoad: function(options) {
    const {
      longitude,
      latitude
    } = options;

    this.setData({
      longitude,
      latitude
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    const {
      searchInputValue
    } = this.data;

    this.getCurrentLocation().then(res => {

      const {
        longitude,
        latitude
      } = res;
      if (searchInputValue) {
        this.getPlaceData({
          keyword: searchInputValue,
          longitude,
          latitude
        }).then(placeDate => {
          this.setData({
            searchInputPlaceList: placeDate.data && placeDate.data.length ? placeDate.data : [],
            markers: [{
              id: selectedPlace.id,
              latitude: selectedPlace.location.lat,
              longitude: selectedPlace.location.lng,
              width: 17,
              height: 32,
              callout: {
                borderWidth: 0
              },
              iconPath: '../../assets/images/marker.png'
            }]
          })
        })
      } else {
        this.getPoiList({
          longitude,
          latitude
        }).then(poiRes => {
          const poiList = poiRes.result.pois && poiRes.result.pois.length ? poiRes.result.pois : [];

          this.setData({
            searchInputPlaceList: poiList.map((item, i) => ({
              ...item,
              selected: i === 0 ? true : false
            })),
            markers: [poiList.map(item => ({
              id: item.id,
              latitude: item.location.lat,
              longitude: item.location.lng,
              width: 17,
              height: 32,
              callout: {
                borderWidth: 0
              },
              iconPath: '../../assets/images/marker.png'
            }))[0]]
          })
        })
      }
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

  getPlaceData: function(params) {
    return new Promise((resolve, reject) => {
      qqmapsdk.search({
        keyword: params.keyword ? params.keyword : '',
        location: `${params.latitude},${params.longitude}`,
        success: function(res) {
          resolve(res)
          console.log("__")
          console.log(res)
        },
        fail: function(err) {
          reject(err)
          console.log("+++")

          console.log(res)

        }
      })
    })
  },
  getPlaceDataByLacation(params) {
    return new Promise((resolve, reject) => {
      qqmapsdk.reverseGeocoder({
        location: `${params.latitude},${params.longitude}`,
        success: function(res) {
          resolve(res)
          console.log("__")
          console.log(res)
        },
        fail: function(err) {
          reject(err)
          console.log("+++")

          console.log(res)

        }
      })
    })
  },

  getPoiList: function(params) {
    return new Promise((resolve, reject) => {
      qqmapsdk.reverseGeocoder({
        location: {
          latitude: params.latitude,
          longitude: params.longitude
        },
        get_poi: 1,
        success: function(res) {
          resolve(res)
        },
        fail: function(err) {
          reject(err)
        }
      })
    })
  },

  selectPlace: function(e) {
    const selectedText = e.target.dataset.place;
    const {
      searchInputPlaceList
    } = this.data;

    if (searchInputPlaceList.map(item => item.title).includes(selectedText)) {
      const selectedPlace = searchInputPlaceList.filter(item => item.title === selectedText)[0];

      this.setData({
        searchInputPlaceList: searchInputPlaceList.map(item => ({
          ...item,
          selected: item.title === selectedText ? true : false
        })),
        longitude: selectedPlace.location.lng,
        latitude: selectedPlace.location.lat,
        markers: [{
          id: selectedPlace.id,
          latitude: selectedPlace.location.lat,
          longitude: selectedPlace.location.lng,
          width: 17,
          height: 32,
          callout: {
            borderWidth: 0
          },
          iconPath: '../../assets/images/marker.png'
        }]
      })
    } else {
      return;
    }
  },

  onFocusSearch: function() {
    this.setData({
      showSearchIcon: false
    })
  },

  onMapTap: function() {
    this.setData({
      showSearchIcon: true,
      searchInputFocus: false
    })
  },

  onSearchInput: function(e) {
    const text = e.detail.value;

    this.setData({
      searchInputFocus: true,
      searchInputValue: text
    })
  },

  onSearchConfirm: function(e) {
    const {
      value
    } = e.detail;

    this.setData({
      searchInputValue: value
    }, () => {
      this.searchBtnTap();
    })
  },

  searchBtnTap: function() {
    const {
      longitude,
      latitude,
      searchInputValue
    } = this.data;

    this.getPlaceData({
      keyword: searchInputValue,
      longitude,
      latitude
    }).then(res => {
      if (res.data.length) {
        this.setData({
          searchInputPlaceList: res.data.map((item, i) => ({
            ...item,
            selected: i === 0 ? true : false
          })),
          longitude: res.data[0].location.lng,
          latitude: res.data[0].location.lat,
          markers: [res.data.map(item => ({
            id: item.id,
            latitude: item.location.lat,
            longitude: item.location.lng,
            width: 17,
            height: 32,
            callout: {
              borderWidth: 0
            },
            iconPath: '../../assets/images/marker.png'
          }))[0]]
        })
      }
    })
  },

  ensureSelectedPlace: function() {
    const {
      longitude,
      latitude
    } = this.data;

    wx.redirectTo({
      url: `/pages/map/map?longitude=${longitude}&&latitude=${latitude}`
    })
  }
})