const { baseApi,hotLine } = require("/utils/util");

const app = getApp();

Page({
  data: {
    aboutLists: [],
    appLogo: '',
    orgName: '',
  },

  getOrgInfo() {
    let _this = this;
    my.showLoading();

    var token = app.get('token');

    my.httpRequest({
      url: `${baseApi}token/org/getOrgInfo`,
      method: 'get',
      headers:{
        'token': token
      },
      dataType: 'json',
      success: function(res) {
        console.log(res.data);
        my.hideLoading();
        if (res.data.code=='10000') {
          
          var aboutListArr = [];
          aboutListArr.push({
            title: '微信公众号',
            text: res.data.data.wxAccountName,
          });

          aboutListArr.push({
            title: '客服电话',
            text: res.data.data.servicePhone,
          });

          aboutListArr.push({
            title: '公司官网',
            text: res.data.data.websiteUrl,
          });
           
          
          _this.setData({
            aboutLists: aboutListArr,
            appLogo: res.data.data.appLogo,
            orgName: res.data.data.orgName,
          });
          
        }
        
      },
      fail: function(res) {
        console.log(res)
      },
    });
  },

  onLoad() {
    let _this = this;
    _this.getOrgInfo();
  },

  /* 拨打电话 */
  makePhoneCall() {
    my.makePhoneCall({ number: hotLine });
  },

  /* 事件 */
  handleAboutus(e){
    let index = e.currentTarget.dataset.key;
    if(index == 1){
      this.makePhoneCall();
    }
  }

});
