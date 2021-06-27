export default {
  pages: [
    'pages/index/index',
    'pages/detail/index',
    'pages/my/index',
    'pages/product/index',
    'pages/confirm/index',
    'pages/about/index',
    'pages/poster/index',
    'pages/integral/index',
    'pages/integralDetail/index',
    'pages/orderDetail/index',
    'pages/coupon/index',
    'pages/myOrder/index',
    'pages/service/index',
    'pages/process/index',
    'pages/open/index',
  ],
  // 注册vant-ui 出现报错需要在config/index中添加路径
  usingComponents: {
    "van-button": "./components/vant-weapp/button/index",
    "van-icon": "./components/vant-weapp/icon/index",
    "van-tabs": "./components/vant-weapp/tabs/index",
    "van-tab": "./components/vant-weapp/tab/index",
    "van-cell-group": "./components/vant-weapp/cell-group/index",
    "van-cell": "./components/vant-weapp/cell/index",
    "van-steps": "./components/vant-weapp/steps/index",
    "van-progress": "./components/vant-weapp/progress/index",

    
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
    navigationStyle: 'custom',
    "enablePullDownRefresh": true
  },
  tabBar: {
    custom: false,
    color: "#969AA3",
    selectedColor: "#479CFE",
    "list": [
      {
        "pagePath": "pages/index/index",
        "iconPath": "static/images/tabs/1-001.png",
        "selectedIconPath": "static/images/tabs/1-002.png",
        "text": "活动中心"
      }, {
        "pagePath": "pages/product/index",
        "iconPath": "static/images/tabs/2-001.png",
        "selectedIconPath": "static/images/tabs/2-002.png",
        "text": "产品"
      }, {
        "pagePath": "pages/my/index",
        "iconPath": "static/images/tabs/3-001.png",
        "selectedIconPath": "static/images/tabs/3-002.png",
        "text": "我的"
      }
    ]
  }
}
