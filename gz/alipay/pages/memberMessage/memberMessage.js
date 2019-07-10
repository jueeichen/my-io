const { baseApi, testApi } = require("/utils/util");
const app = getApp();

Page({
  data: {
    num: 0,             //第几页，0,1,2...
    offest: 0,          //第几页，0,1,2...
    step: 10,           //一页多少个
    messageLists:[],       //消息数据
    messageBaseLine: false, ////底线状态，默认不出现，小于一页，拉到底了
    isNoData: false,     //是否有数据
    messageTotal: 0,    //消息中心  -总个数
  },
  onLoad() {
    this.accountRequest(0, 10, true);
  },

  /* 加载更多
  * offest: (num+1) * step;  [0,14], [15,29], [30,44], [45,69] ... 默认：0
  * step: 每页10条，默认：10
  * isRefresh : 是否是顶部下拉刷新, 默认：false
  */
  accountRequest(offest = this.data.offest, step = this.data.step, isRefresh = false){   
    let _this = this;
    let params = {
       from: offest,
       pageNum: step
    }
    my.showLoading({
      content: "加载中..."
    });

    app.http(`${baseApi}/token/user/getMessageInfo`, "POST", params, app.get('token'))
       .then( res => {
         console.log(res);
         my.hideLoading();
         //暂无数据
         if( res.data.data.content == 0 ){
           _this.setData({
             isNoData: true 
           })
           my.stopPullDownRefresh();
         }

         //如果数据小于10条，不满一页，没数据了  => 把剩余的结果也要追加到类表中 => 再停止
         if( res.data.data.content.length < _this.data.step ){
           _this.setData({
             messageBaseLine: true,
             messageLists: isRefresh ? res.data.data.content : [..._this.data.messageLists, ...res.data.data.content]  // true：顶部刷新， false: 数据分页组合
           })
           return;
         }
         
         _this.setData({
           messageTotal: res.data.data.totalElements,
           messageLists: isRefresh ? res.data.data.content : [..._this.data.messageLists, ...res.data.data.content]  // true：顶部刷新， false: 数据分页组合
         })

         
       })
       .catch( res => {
         my.hideLoading();
         console.log( `===> ${res}` );
       })
  },

  //刷新
  onPullDownRefresh() {
    this.accountRequest(0, 10, true);
    my.stopPullDownRefresh();
  },

  //加载更多
  onReachBottom() {
    //判断是否到底了，
    if(!this.data.messageBaseLine){
      //没到底，继续滚动加载
      this.setData({ 
        offest: ++this.data.offest
      })
      this.accountRequest(this.data.offest, this.data.step, false);
    }else{
      //到底了，停止滚动
      this.setData({ 
        offest: 0
      })
      return;
    }
    
  },
});