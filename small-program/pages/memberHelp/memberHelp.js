import { baseApi, hotLine, request } from "../../utils/util"
import { loginByWeixin } from "../../utils/user"

const app = getApp();
// console.log(app)

Page({
   data: {
      num: 0,             //第几页，0,1,2...
      offest: 0,          //从第？个开始 [0,14], [15,29], [30,44], [45,69] ...
      step: 15,           //一页多少个
      helpLists: [
         { title: '怎么租借充电宝和充电线?', id: '1' },
         { title: '充电宝租借如何计算费用的?', id: '2' },
         { title: '共享充电宝支持哪些手机类型?', id: '3' },
         { title: '如何归还充电宝?', id: '4' },
         { title: '押金如何退还?', id: '5' },
         { title: '充电宝弹出失败怎么办？', id: '6' },
         { title: '借出的充电宝无法充电怎么办?', id: '7' },
         { title: '归还充电宝后订单没有结束怎么办?', id: '8' },
         { title: '柜机还满/店铺打烊无法归还怎么办?', id: '9' },
         { title: '押金退还是否会有提现费?', id: '10' },
         { title: '充电宝超时归还说明', id: '11' },
         { title: '租借充电线的使用说明', id: '12' },
         { title: '租借充电线的付费套餐', id: '13' },
         { title: '充电宝优惠活动', id: '14' },


      ],       //新闻数据
      lineStatus: false,  //底线状态，默认不出现，小于一页，拉到底了
      isNoData: false,     //是否有数据
      hotLine: ''
   },


   /* 帮助中心事件 */
   handleHelp(e) {
      let status = e.currentTarget.dataset.status;
      let key = e.currentTarget.dataset.key;
      let index = 'helpLists[' + key + '].status';
      if (status == true) {
         this.setData({
            [index]: false
         })
      } else {
         this.setData({
            [index]: true
         })
      }
   },



   /* 加载更多
   * offest: (num+1) * step;  [0,14], [15,29], [30,44], [45,69] ... 默认：0
   * step: 每页15条，默认：15
   * isRefresh : 是否是顶部下拉刷新, 默认：false
   */
   helpRequest(offest = this.data.offest, step = this.data.step, isRefresh = false) {
      let _this = this;
      wx.showLoading({
         content: "加载中..."
      });
     app.http(`${baseApi}getHelp`, "POST", {
         offest: offest,
         step: step
      })
         .then(res => {
            //暂无数据
            if (res.data.data.length == 0) {
               _this.setData({
                  isNoData: true
               })
               wx.stopPullDownRefresh();
            }

            //如果数据小于15条，不满一页，没数据了，停止
            if (res.data.data.length < _this.data.step) {
               _this.setData({
                  lineStatus: true
               })
               wx.stopPullDownRefresh();
            }

            //  _this.setData({
            //    helpLists: isRefresh ? res.data.data : [..._this.data.helpLists, ...res.data.data]  // true：顶部刷新， false: 数据分页组合
            //  })


         })
         .catch(res => {
            // console.log(`===> ${res}`);
         })
         .then(res => {
            wx.hideLoading();
         })
   },

  

  

   getOrgInfo() {
      let _this = this;

      app.http(`${baseApi}token/org/getOrgInfo`, 'get', {}, true).then(
         res => {
            // console.log(res.data);
            if (res.data.code == '10000') {

               _this.setData({
                  hotLine: res.data.data.servicePhone
               });

            } else {
               _this.setData({
                  hotLine: hotLine
               });
            }
         }
      );

   },

   onLoad() {
      let _this = this;
      // _this.helpRequest();
     _this.getOrgInfo();
      //判断是否登录
      // console.log(1111111111)
    //  var token = wx.getStorageSync('token');
      // console.log(token)
      // if (token) {
      //    _this.getOrgInfo();
      // } else {
      //    loginByWeixin().then(
      //       res => {
      //          _this.getOrgInfo();
      //       }
      //    );
      // }

   },

   /* 拨打电话 */
   makePhoneCall() {
      let _this = this;
     wx.makePhoneCall({ phoneNumber: `${_this.data.hotLine}`  });
   },

});
