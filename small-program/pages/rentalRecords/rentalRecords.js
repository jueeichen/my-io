import {
  baseApi,
  request
} from "../../utils/util"


Page({

  /**
   * 页面的初始数据
   */
  data: {
    bottomLineState: false, //底线
    totleNumber: 0,
    tabsName: ['充电宝', '线充'],
    activeIndex: 0,
    offset: 0,
    tabsData: [],
    scrollTop: 0,
    scrollViewHeight: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onHide() {
    this.setData({
      activeIndex: 0
    })
  },
  onLoad: function(options) {

  },
  navOrderDetail(e) {
    console.log(e.currentTarget.dataset.tab.leaseState.status)
    if (e.currentTarget.dataset.tab.leaseState.status === "2" && this.data.activeIndex=="0") {
      wx.navigateTo({
        url: '/pages/usingPowerBank/usingPowerBank'
      })
    } else {
      wx.navigateTo({
        url: '/pages/orderDetail/orderDetail?orderNo=' + e.currentTarget.dataset.tab.listItem[4].value,
      })
    }

  },
  getRentalRecords: function(params) {
    return new Promise((resolve, reject) => {
      request(`${baseApi}token/user/getLeaseInfo`, {
        filter: params.activeIndex + 1,
        from: params.from,
        pageNum: 7
      }, 'POST').then(res => {
        if (res.statusCode === 200 && res.data.code === '10000') {
          resolve(res.data.data);
        } else {
          reject(res.errMsg);
        }
        //暂无数据
        if (res.data.data.content.length == 0) {
          console.log(res.data.data.content.length);
          this.setData({
            isNoData1: true,
            isNoData2: false

          })
          // my.stopPullDownRefresh();
        } else {
          this.setData({
            isNoData1: false,
            isNoData2: true

          })
        }
      }).catch(err => reject(err))
    })
  },

  onShow: function() {
    const {
      activeIndex,
      offset,
      tabsData
    } = this.data;


    wx.getSystemInfo({
      success: res => {
        this.setData({
          scrollViewHeight: res.windowHeight
        })
      },
    });

    this.getRentalRecords({
      activeIndex: activeIndex,
      from: offset
    }).then(res => {
      const tabs = res.content.map(item => ({
        leaseState: {
          name: {
            '1': '代付款',
            '2': '租借中',
            '3': '归还未支付',
            '4': '已完成',
            '5': '已超时',
            '6': '租借失败'
          }[item.status],
          status: item.status,
          value: item.realAmount || 0
        },
        listItem: [{
          name: item.status==6?'订单时间':'借出时间',
          value: item.createDateStr || ''
        }, {
          name: '租借时长',
          value: `${item.borrowHours || '-'}分钟`
        }, {
          name: '支付类型',
          value: item.payType || ''
        }, {
          name: '租借地点',
          value: item.borrowShopName || ''
        }, {
          name: '订单号',
          value: item.orderNo || ''
        }, {
            name: item.status == 6 ? '失败原因' : '收费标准',
            value: item.status == 6 ? item.popFailReason:item.chargingStandard || ''
        }]
      }))
      this.setData({
        totleNumber: res.totalElements,
        tabsData: [{
          tab: tabs
        }, {}]
      })
    })
  },

  tabClick: function(e) {
    const {
      activeindex
    } = e.target.dataset;

    this.setData({
      activeIndex: activeindex,
      scrollTop: 0,
      offset: 0,
      bottomLineState: false
    })

    this.getRentalRecords({
      activeIndex: activeindex,
      from: 0
    }).then(res => {

      const tabs = res.content.map(item => ({
        leaseState: {
          name: {
            '1': '代付款',
            '2': '租借中',
            '3': '归还未支付',
            '4': '已完成',
            '5': '已超时',
            '6': '租借失败'
          }[item.status],
          status: item.status,
          value: item.realAmount || 0
        },
        listItem: [{
          name: item.status == 6 ? '订单时间' : '借出时间',
          value: item.createDateStr || ''
        }, {
          name: '购买时长',
          value: `${item.borrowHours || '-'}分钟`
        }, {
          name: '支付类型',
          value: item.payType || ''
        }, {
          name: '租借地点',
          value: item.borrowShopName || ''
        }, {
          name: '订单号',
          value: item.orderNo || ''
        }, {
            name: item.status == 6 ? '失败原因' : '收费标准',
            value: item.status == 6 ? item.popFailReason : item.chargingStandard || ''
        }]
      }))
      this.setData({
        totleNumber: res.totalElements,
        tabsData: activeindex === 0 ? [{
          tab: tabs
        }, {}] : [{}, {
          tab: tabs
        }]
      })
    })
  },

  scrollToTop: function() {
    console.log('scrollToTop')
  },

  scrollToBottom: function() {
    const {
      offset,
      activeIndex,
      tabsData,
      totleNumber
    } = this.data;
    tabsData[activeIndex].tab.length == totleNumber && this.setData({
      bottomLineState: true
    })
    // console.log(tabsData[0].tab.length)
    // console.log(totleNumber)

    if (tabsData[activeIndex].tab.length < totleNumber) {
      console.log("123")
      this.getRentalRecords({
        activeIndex: activeIndex,
        from: offset + 1
      }).then(res => {
        if (res.content.length) {
          const tabs = res.content.map(item => ({
            leaseState: {
              name: {
                '1': '代付款',
                '2': '租借中',
                '3': '归还未支付',
                '4': '已完成',
                '5': '已超时',
                '6': '租借失败'
              }[item.status],
              status: item.status,
              value: item.realAmount || 0
            },
            listItem: [{
              name: item.status == 6 ? '订单时间' : '借出时间',
              value: item.createDateStr || ''
            }, {
              name: '租借时长',
              value: `${item.borrowHours || '-'}分钟`
            }, {
              name: '支付类型',
              value: item.payType || ''
            }, {
              name: '租借地点',
              value: item.borrowShopName || ''
            }, {
              name: '订单号',
              value: item.orderNo || ''
            }, {
                name: item.status == 6 ? '失败原因' : '收费标准',
                value: item.status == 6 ? item.popFailReason : item.chargingStandard || ''
            }]
          }))
          this.setData({
            offset: offset + 1,
            totleNumber: res.totalElements,
            tabsData: activeIndex === 0 ? [{
              tab: [...tabsData[activeIndex].tab, ...tabs]
            }, {}] : [{}, {
              tab: [...tabsData[activeIndex].tab, ...tabs]
            }]
          })
        } else {

          return;
        }
      })
    }

  }
})