const app = getApp()
Component({
  data: {
    selected: 0,
    color: "#969AA3",
    selectedColor: "#479CFE",

    "list": [
      {
        "pagePath": "pages/active/index",
        "iconPath": "/static/images/tabs/1-001.png",
        "selectedIconPath": "/static/images/tabs/1-002.png",
        "text": "活动中心"
      }, {
        "pagePath": "pages/index/index",
        "iconPath": "/static/images/tabs/2-001.png",
        "selectedIconPath": "/static/images/tabs/2-002.png",
        "text": "产品"
      }, {
        "pagePath": "pages/my/index",
        "iconPath": "/static/images/tabs/3-001.png",
        "selectedIconPath": "/static/images/tabs/3-002.png",
        "text": "我的"
      }
    ]
  },

  ready() {
    console.log(getApp().globalData)
    if (getApp().globalData === undefined) {
      getApp().globalData = {
        selectedIndex: 1
      }
    }
    this.getTabBar().setData({
      selected: getApp().globalData.selectedIndex
    })
    return
    console.log(this)
    const url = getCurrentPages()[getCurrentPages().length - 1].route
    const list = this.data.list
    let i = 1
    // console.log(url, list)
    list.map((item, index) => {
      if (url === item.pagePath) {
        i = index
      }
    })
    // setTimeout(() => {
    this.setData({
      selected: i
    });
    console.log(i)
    // }, 1000)
  },
  lifetimes: {
    attached() {
      return
      const url = getCurrentPages()[getCurrentPages().length - 1].route
      const list = this.data.list
      let i = 1
      console.log(url, list)
      list.map((item, index) => {
        if (url === item.pagePath) {
          i = index
        }
      })
      setTimeout(() => {
        this.getTabBar().setData({
          selected: i
        });
        console.log(i)
      }, 1000)

    }

  },
  methods: {
    // 切换页面
    switchTab(e) {
      console.log(e)
      const index = e.currentTarget.dataset.index
      wx.switchTab({
        url: '/' + e.currentTarget.dataset.path,
        success: () => {
          console.log(index)
          getApp().globalData.selectedIndex = index
          // this.setData({
          //   selected: e.currentTarget.dataset.index
          // })
          // this.getTabBar().setData({
          //   selected: e.currentTarget.dataset.index
          // });
        }

      })

      // this.setData({
      //   selected: index
      // })
    }
  }
})
