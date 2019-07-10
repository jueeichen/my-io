const { hotLine, testApi } = require("/utils/util");
const app = getApp();

Page({
  data: {
    num: 0,             //第几页，0,1,2...
    offest: 0,          //从第？个开始 [0,14], [15,29], [30,44], [45,69] ...
    step: 15,           //一页多少个
    helpLists:[],       //新闻数据
    lineStatus: false,  //底线状态，默认不出现，小于一页，拉到底了
    isNoData: false     //是否有数据
  },
  
  onLoad() {
    this.helpRequest();
  },

  /* 帮助中心事件 */
  handleHelp(e){
    let status = e.currentTarget.dataset.status;
    let key = e.currentTarget.dataset.key;
    let index = 'helpLists['+key+'].status';
    if( status == true ){
      this.setData({
        [index]: false
      })
    }else{
      this.setData({
        [index]: true
      })
    }
  },

  /* 拨打电话 */
  makePhoneCall() {
    my.makePhoneCall({ number: hotLine });
  },

  /* 事件 */
  handlePhone(e){
      this.makePhoneCall();
  },

  /* 加载更多
  * offest: (num+1) * step;  [0,14], [15,29], [30,44], [45,69] ... 默认：0
  * step: 每页15条，默认：15
  * isRefresh : 是否是顶部下拉刷新, 默认：false
  */
  helpRequest(offest = this.data.offest, step = this.data.step, isRefresh = false){   
    let _this = this;
    my.showLoading({
      content: "加载中..."
    });
    app.http(`${testApi}getHelp`, "POST", {
              offest: offest,
              step: step
            })
       .then( res => {
         //暂无数据
         if( res.data.data.length == 0 ){
           _this.setData({
             isNoData: true 
           })
           my.stopPullDownRefresh();
         }

         //如果数据小于15条，不满一页，没数据了，停止
         if( res.data.data.length < _this.data.step ){
           _this.setData({
             lineStatus: true
           })
           my.stopPullDownRefresh();
         }
         
         _this.setData({
           helpLists: isRefresh ? res.data.data : [..._this.data.helpLists, ...res.data.data]  // true：顶部刷新， false: 数据分页组合
         })
         
       })
       .catch( res => {
         console.log( `===> ${res}` );
       })
       .then( res =>{
          my.hideLoading();
       })
  },

  //刷新
  onPullDownRefresh() {
    this.helpRequest(0, 15, true);
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

      this.helpRequest(this.data.offest, this.data.step, false);
    }else{
      //到底了，停止滚动
      return;
    }
    
  },

});
