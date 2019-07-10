const { hotLine, baseApi } = require("/utils/util");
const app = getApp();

Page({
  data: {
    num: 0,             //第几页，0,1,2...
    offest: 0,          //从第？个开始 [0,14], [15,29], [30,44], [45,69] ...
    step: 10,           //一页多少个
    sotreLists:[],      //店铺数据
    lineStatus: false,  //底线状态，默认不出现，小于一页，拉到底了
    isNoData: false,     //是否有数据
    latitude: '',
    longitude: ''
  },
  
  onLoad(e) {
    let _this = this;
    _this.setData({
      latitude: e.latitude,
      longitude: e.longitude
    });

    this.storeRequest();
  },

  /* 加载更多
  * offest: (num+1) * step;  [0,4], [5,9], [10,14], [15,19] ... 默认：0
  * step: 每页5条，默认：5
  * isRefresh : 是否是顶部下拉刷新, 默认：false
  */
  storeRequest(offest = this.data.offest, step = this.data.step, isRefresh = false){   
    let _this = this;
    let _lat = _this.data.latitude;
    let _log = _this.data.longitude;

    my.showLoading({
      content: "加载中..."
    });
    app.http(`${baseApi}token/device/getNearCabinets`, "POST", {
              from: offest,
              pageNum: step,
              filter: _lat,
              filter2: _log
            },
            app.get('token'))
       .then( res => {
         console.log(res)
         //暂无数据
         if( res.data.data.content.length == 0 ){
           this.setData({
             isNoData: true 
           })
           my.stopPullDownRefresh();
         }

         //如果数据小于15条，不满一页，没数据了，停止
         if( res.data.data.content.length < this.data.step ){
           this.setData({
             lineStatus: true,
             sotreLists: isRefresh ? res.data.data.content : [...this.data.sotreLists, ...res.data.data.content]  // true：顶部刷新， false: 数据分页组合
           })
           return;
         }
         
         this.setData({
           sotreLists: isRefresh ? res.data.data.content : [...this.data.sotreLists, ...res.data.data.content]  // true：顶部刷新， false: 数据分页组合
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
    this.storeRequest(0, 6, true);
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

      this.storeRequest(this.data.offest, this.data.step, false);
    }else{
      //到底了，停止滚动
      this.setData({ 
        offest: 0
      })
      return;
    }
    
  },

});
