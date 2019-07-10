const { baseApi } = require("/utils/util");
const app = getApp();

Page({
  data: {
    num: 0,             //第几页，0,1,2...
    offest: 0,          //从第？个开始 [0,14], [15,29], [30,44], [45,69] ...
    step: 10,           //一页多少个
    depositLists:[],       //新闻数据
    lineStatus: false,  //底线状态，默认不出现，小于一页，拉到底了
    isNoData: false,     //是否有数据
    depositTotal: 0,    //充电宝  -总个数
  },
  onLoad() {
    this.depositRequest(0, 10, true);
  },


  /* 加载更多
  * offest: (num+1) * step;  [0,14], [15,29], [30,44], [45,69] ... 默认：0
  * step: 每页15条，默认：15
  * isRefresh : 是否是顶部下拉刷新, 默认：false
  */
  depositRequest(offest = this.data.offest, step = this.data.step, isRefresh = false){   
    let _this = this;
    let params = {
       from: offest,
       pageNum: step,
       filter: "2"
    }
    my.showLoading({
      content: "加载中..."
    });
    app.http(`${baseApi}/token/user/getTransactionInfo`, "POST", params, app.get('token'))
       .then( res => {
         console.log(res)
         my.hideLoading();
         //暂无数据
         if( res.data.data.content.length == 0 ){
           _this.setData({
             isNoData: true 
           })
           my.stopPullDownRefresh();
         }

         //如果数据小于15条，不满一页，没数据了，停止
         if( res.data.data.content.length < _this.data.step ){
           _this.setData({
             lineStatus: true,
             depositLists: isRefresh ? res.data.data.content : [..._this.data.depositLists, ...res.data.data.content]  // true：顶部刷新， false: 数据分页组合
           })
           return;
         }
         
         _this.setData({
           depositTotal: res.data.data.totalElements,
           depositLists: isRefresh ? res.data.data.content : [..._this.data.depositLists, ...res.data.data]  // true：顶部刷新， false: 数据分页组合
         })
         
       })
       .catch( res => {
         my.hideLoading();
         console.log( `===> ${res}` );
       })
  },

  //刷新
  onPullDownRefresh() {
    this.depositRequest(0, 10, true);
    my.stopPullDownRefresh();
  },

  //加载更多
  onReachBottom() {
    //判断是否到底了，
    if(!this.data.lineStatus){
      //没到底，继续滚动加载
      this.setData({ 
        offest: ++this.data.offest
      })
      this.depositRequest(this.data.offest, this.data.step, false);
    }else{
      //到底了，停止滚动
      this.setData({ 
        offest: 0
      })
      return;
    }
    
  },
});