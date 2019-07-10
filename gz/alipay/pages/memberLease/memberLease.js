
const { baseApi } = require("/utils/util");
const app = getApp();

Page({
  data: {
    tabs: [
      {title: '充电宝'},
      { title: '充电线'}
    ],
    activeTab: 0,
    batteryLists: [],   //充电宝 - 数据集合
    lineLists: [],      //线冲 - 数据集合
    batteryTotal: 0,    //充电宝  -总个数
    lineTotal: 0,       //线冲  -总个数
    num: 0,             //第几页，0,1,2...
    offest: 0,          //从第？个开始 [0,14], [15,29], [30,44], [45,69] ...
    step: 10,            //一页多少个
    batteryBaseLine: false,
    lineBaseLine: false,  //底线状态，默认不出现，小于一页，拉到底了
    isBatteryNoData: false,    //充电宝是否有数据
    isLineNoData: false,      //线充是否有数据
    scrollTop: 0,           //设置竖向滚动条位置
    winHeight: '',        //屏幕高度
  },

  onLoad() {
    let _this = this;
    this.leaseRequest(this.data.activeTab, 0, this.data.step, true);
    //高度自适应
    my.getSystemInfo( {  
        success: function( res ) {  
          let clientHeight = res.windowHeight,
              clientWidth = res.windowWidth,
                rpxR = 750/clientWidth;
          let calc = clientHeight*rpxR - 120;
            console.log(calc)
            _this.setData( {  
                winHeight: calc  
            });  
        }  
    });
  },

  //Tab切换点击事件， 参数数据初始化，(index, offest, step, true), 滚动条位置设置0
  handleTabClick({ index }) {
    this.setData({
      activeTab: index,
      offest: 0,
    });
    this.leaseRequest(index, 0, this.data.step, true);   //init 初始化 0, 0, 8, true
  },
  handleTabChange({ index }) {
    this.setData({
      activeTab: index,
      offest: 0
    });
    this.leaseRequest(index, 0, this.data.step, true);   //init 初始化 0, 0, 8, true
  },

  //刷新
  onPullDownRefresh() {
    let activeTab = this.data.activeTab;    //要刷新哪个分类的，充电宝/现充 
    this.leaseRequest(activeTab, 0, this.data.step, true);   //init 初始化 0, 0, 8, true
    my.stopPullDownRefresh();
  },

  upper(e) {
    console.log(e);
  },

  //加载更多
  lower(e) {
    //console.log(e);
    let activeTab = this.data.activeTab;    //要刷新哪个分类的，充电宝/现充 
    if(!activeTab){
      //充电宝
      if(!this.data.batteryBaseLine){
        //没到底，继续滚动加载
        this.setData({ 
          num: ++this.data.num,
          offest: ++this.data.offest
        })
        this.leaseRequest(activeTab, this.data.offest, this.data.step, false);
      }else{
        //到底了，停止滚动，且重置从0开始计算
        this.setData({ 
          offest: 0
        })
        return;
      }
    }
    else{
      //线充
      if(!this.data.lineBaseLine){
        //没到底，继续滚动加载
        this.setData({ 
          offest: ++this.data.offest
        })
        this.leaseRequest(activeTab, this.data.offest, this.data.step, false);
      }else{
        //到底了，停止滚动，且重置从0开始计算
        this.setData({ 
          offest: 0
        })
        return;
      }
    }
  },
  

  /* request 滚动加载
  * offest: (num+1) * step;  [0,14], [15,29], [30,44], [45,69] ... 默认：0
  * step: 每页15条，默认：15
  * isRefresh : 是否是顶部下拉刷新, 默认：false
  */
  leaseRequest(activeTab = this.data.activeTab, offest = this.data.offest, step = this.data.step, isRefresh = false){   
    let _this = this;
    my.showLoading({
      content: "加载中..."
    });
    
    /*
    * 特殊处理，刷新情况下 
    * 选中当前选项卡，清空其他选项卡的数据，
    * 解决从A选项卡到B选项卡，高度还停留在A的高度，无法滚动B到底部，没法加载更多
    */
    /*if(isRefresh){
      if(activeTab ==0){
        _this.setData({
          lineLists: [] //清空其他数据
        })
      }
      else{
        _this.setData({
          batteryLists: [] //清空其他数据
        })
      }
    }*/

    var filter = '';
    if (activeTab == 0) {
      filter = '1';
    } else if (activeTab == 1) {
      filter = '2';
    }


    //request
    let params = { filter: filter,  from: offest, pageNum: step};
    app.http(`${baseApi}/token/user/getLeaseInfo`, "POST", params, app.get('token'))
       .then( res => {
         console.log(res)
          my.hideLoading();
         
          //暂无数据
          if( res.data.data.content.length == 0 ){
            if(activeTab == 0){
              _this.setData({
                isBatteryNoData: true 
              })
            }else{
              _this.setData({
                isLineNoData: true 
              })
            }
            my.stopPullDownRefresh();
          }

          //如果数据不满一页，没数据了，停止
          if( res.data.data.content.length < _this.data.step ){
            if(!activeTab){
              //充电宝
              _this.setData({
                batteryBaseLine: true,
                batteryLists: isRefresh ? res.data.data.content : [..._this.data.batteryLists, ...res.data.data.content],// true：顶部刷新， false: 数据分页组合
              })
            }
            else{
              //线充
              this.setData({
                lineBaseLine: true,
                lineLists: isRefresh ? res.data.data.content : [..._this.data.lineLists, ...res.data.data.content],// true：顶部刷新， false: 数据分页组合
              })
            }
            my.stopPullDownRefresh();
          }
          
          if( activeTab == 0 ){
            //充电宝结果
            _this.setData({
              batteryLists: isRefresh ? res.data.data.content : [..._this.data.batteryLists, ...res.data.data.content],// true：顶部刷新， false: 数据分页组合
              batteryTotal: res.data.data.totalElements,
              lineTotal: [] //清空其他数据
            })
          }else{
            //线冲结果
            _this.setData({
              lineLists: isRefresh ? res.data.data.content : [..._this.data.lineLists, ...res.data.data.content],// true：顶部刷新， false: 数据分页组合
              lineTotal: res.data.data.totalElements,
              batteryTotal: []  //清空其他数据
            })
          }
         
       })
       .catch( res => {
         my.hideLoading();
         console.log( `===> ${res}` );
       })
  },

  


  /*getOrderRentList() {
    let _this = this;
    my.showLoading();

    var token = app.get('token');

    my.httpRequest({
      url: `${baseApi}token/user/getLeaseInfo`,
      method: 'post',
      headers:{
        'token': token
      },
      data:{
        'pageNum' : '10',
        'filter' : '1'
      },
      dataType: 'json',
      success: function(res) {
        console.log(res.data);
        my.hideLoading();
        if (res.data.code=='10000') {
          
          
        }
        
      },
      fail: function(res) {
        console.log(res)
      },
    });
  },*/

});