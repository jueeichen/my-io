const { mapKey } = require("/utils/util");
const app = getApp();

Page({
  data: {
    longitude: '',
    latitude: '',
    sercherLongitude: '',     //搜索经度
    sercherLatitude: '',      //搜索纬度
    initLongitude: '',        //初始化经度(备份地址)
    initLatitude: '',         //初始化纬度(备份地址)
    inputLongitude: '',       //输入框经纬度
    inputLatitude: '',        //输入框经纬度
    scale: 15,          //缩放级别
    poisLists: [],      //周边poi
    scrollTop: 0,
    searchValue: '',    //搜索框的值
    winHeight: '',      //屏幕高度
    isShowPoi: false,    //是否显示搜索周边列表
    searchPoisLists: [],  //输入框搜索的列表集合
  },

  // 定位 => 获取当前地址
  getLocation(){
    return new Promise( (resolve, reject) =>{
      my.getLocation({
        success(res) {
          resolve(res)
        },
        fail(err){
          reject(err)
        }
      })
    })
  },

  //初始化定位当前位置
  myLocationInit(){
    let _this = this;
    let { inputLongitude, inputLatitude } = this.data;
    if( inputLongitude && inputLatitude){    //如果是从搜索栏更正地址 => 输入框经纬度传参重新定位，搜索相关列表 
      _this.setData({
        sercherLongitude: inputLongitude,
        sercherLatitude: inputLatitude
      })
      _this.getLocationLists(this.data.sercherLongitude, this.data.sercherLatitude);  //相关地址搜索
      
    }else{        //初始化不带参数，=> 自己定位 => 直接进入页面
    
      _this.getLocation()
        .then( res=>{
          console.log(res);
          _this.setData({
            longitude: res.longitude,
            latitude: res.latitude,
            initLongitude: res.longitude,   //备份初始化地址
            initlatitude: res.latitude      //备份初始化地址
          })
          return res;
        })
        .then( res =>{    //相关地址搜索
          _this.getLocationLists(res.longitude, res.latitude);
        })

    }
  },

  /* 单选 => 地址逆向解析 => 地图更换坐标位置 => 地图重新定位 */
  radioChange: function(e) {
    let _this = this;
    app.http( "https://restapi.amap.com/v3/geocode/geo" , "GET", 
        {
          address: e.detail.value,
          key: mapKey
        })
        .then(res=>{
            console.log(res);
            if(res.data.geocodes.length > 0){
              let newLocArray = res.data.geocodes[0].location.split(",");
              _this.setData({
                longitude: newLocArray[0],
                latitude: newLocArray[1]
              })
              //_this.getLocatPosition();
            }
        })

  },

  /* 相关地址 => 滚动区域加载 */
  lower(e) {
    console.log(e);
  },

  /* 地图工具   1、定位按钮 =>  使用备份地址定位过来 */
  getLocatPosition(){
    this.setData({
      longitude: this.data.initLongitude,
      latitude: this.data.initlatitude,
    })
    this.mapCtx.moveToLocation();
    this.getLocationLists(this.data.initLongitude, this.data.initlatitude);
  },

  /* 地图工具   2、移动地图区域 => 更换经纬度 => 更新列表poi */
  onRegionChange(e){
    let _this = this;
    if (e.type == 'end'){
      this.mapCtx.getCenterLocation({
        success(res){
          //console.log(res);
          _this.getLocationLists(res.longitude, res.latitude);
        }
      })
    }
  },
  
  /* 相关列表pois 封装函数 */
  getLocationLists(lon,lat){
    my.showLoading({
      content: '加载中...',
      delay: 1000,
    });
    let _this = this;
    app.http( `https://restapi.amap.com/v3/geocode/regeo?location=${lon},${lat}&key=${mapKey}&radius=1000&extensions=all` )
        .then(res=>{
          my.hideLoading();
           _this.setData({
            poisLists: res.data.regeocode.pois,
            longitude: lon,
            latitude: lat
          })
       })
       .catch(err=>{
          my.hideLoading();
          console.log(err);
          my.showToast({
            type: 'fail',
            content: '定位失败',
            duration: 2000
          });
       })
  },

  /* 确定 */
  handleSearchSureBtn(){
    const { longitude, latitude } = this.data;
    console.log(longitude, latitude);
    my.navigateTo({
      url: `/pages/mapSearch/mapSearch?longitude=${longitude}&latitude=${latitude}`
    });
  },


  /***********  搜索栏板块 ***********/

  /* 搜索框 - 获取焦点 */
  handleFocus(){
    this.setData({
      isShowPoi: true
    })
  },

  /* 搜索框 - 点击取消 */
  handleCancel(){
    this.setData({
      isShowPoi: false
    })
  },

  /* 选中事件 pois 周边信息 */
  onItemClick(ev) {
    let newLocArray = ev.index.split(",");
    this.setData({
      isShowPoi: false,
      inputLongitude: newLocArray[0],
      inputLatitude: newLocArray[1],
      //移动定位
      longitude: newLocArray[0],
      latitude: newLocArray[1]
    })
    //console.log(this.data.inputLongitude, this.data.inputLatitude)

    //查询相关列表
    this.getLocationLists(newLocArray[0], newLocArray[1]);
    
  },

  /* 输入查询 */
  handleSubmit(e){
    my.showLoading({
      content: '加载中...',
    });
    this.setData({
      isShowPoi: true
    })
    const prarms = { keywords: e, key: mapKey, extensions: "all" };
    app.http( "https://restapi.amap.com/v3/place/text" , "GET", prarms)
        .then(res=>{
            my.hideLoading();
            //console.log(res.data.pois);
            if(res.data.pois.length > 0){
              this.setData({
                searchPoisLists: res.data.pois
              })
            }else{
              my.alert({
                content: '无法搜索相关位置，请精准输入！'
              });
            }
        })
    
  },



  onLoad(e) {
    let _this = this;
    this.mapCtx = my.createMapContext('modifyLocalMap');
    this.myLocationInit(e);

    //高度自适应
    my.getSystemInfo( {  
        success: function( res ) {  
          let clientHeight = res.windowHeight,
              clientWidth = res.windowWidth,
                rpxR = 750/clientWidth;
          let calc = clientHeight*rpxR - 640;
            console.log(calc)
            _this.setData( {  
                winHeight: calc  
            });  
        }  
    });
    
  },
});
