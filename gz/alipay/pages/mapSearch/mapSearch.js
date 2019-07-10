import { baseApi } from "/utils/util"

const app = getApp();

Page({
  data: {
    longitude: '',
    latitude: '',
    initLongitude: '',    //搜索传参的经度
    initLatitude: '',     //搜索传参的纬度
    scale: 15,   //缩放级别
    userInfo: {
      nickName: '',
      avatar: '/assets/images/avatar.png'
    },
    //其他目的标记点
    markers: [],                //标记点部分集合
    markersArr: [],             //标记点的所有集合
    targetChargingStatus: false,//充电宝弹窗状态
    targetBattery: null,        //选中某个充电宝数据信息
    usingStatus: 0,             //用户用宝状态： 0：没使用； 1：使用中； 2：有未支付订单；
    orderNo: '',
  },
  
  
  // 定位当前地址promise => 返回结果
  handleLocation(){
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

  //初始化定位 => 获取经纬度坐标
  getLocation(e){
    let _this = this;
    _this.handleLocation()
        .then( res =>{
          _this.setData({
            initLongitude: res.longitude,   //存储自己默认的备用地址
            initlatitude: res.latitude,
          })

          if( e.longitude && e.latitude ) {   //搜索地图工具 => 带经纬度参数
              _this.setData({
                longitude: e.longitude,
                latitude: e.latitude
              })
          }else{   //未带经纬度参数 => 初始化定位当前位置
            _this.setData({
              longitude: res.longitude,
              latitude:  res.latitude,
            })
          }
          return res;
        })
        .then( res =>{
          //检查登录
          _this.getUserId();
        })
  },
 
  //检查是否登录
  getUserId(){
    let _this = this;
    var isLogin = app.get('isLogin');
    if (isLogin){
      _this.getMapIndexConf();
      _this.searchCabinets();
    } else{ 
      app.getUserId().then(
        res => {
          _this.getMapIndexConf();
          _this.searchCabinets();
        }
      );
    }
  },

   /* 定位原来初始化位置 => 搜索周边充电宝 */
  getLocatPosition(){
    this.setData({
      longitude: this.data.initLongitude,
      latitude: this.data.initlatitude,
    })
    this.mapCtx.moveToLocation();
    this.searchCabinets(this.data.latitude, this.data.longitude);
  },

  //拖动地图区域 => 搜索周边充电宝
  onRegionChange(e){
  let _this = this;
    _this.setData({
      targetChargingStatus: false
    });
    //实时获取定位点的坐标
    if (e.type == 'end'){
      this.mapCtx.getCenterLocation({
        success(res){
          console.log(res);
          _this.searchCabinets(res.latitude, res.longitude);
        }
      })
    }
  },

  //登录后， => 搜索周边充电宝函数
  searchCabinets(lat, log) {
    my.showLoading();
    let _this = this;
    let _lat = lat ? lat : _this.data.latitude;
    let _log = log ? log : _this.data.longitude;
    let token = app.get('token');
    my.httpRequest({
      url: `${baseApi}token/device/searchCabinets?latitude=${_lat}&longitude=${_log}`,
      method: 'get',
      headers:{
        'token': token
      },
      dataType: 'json',
      success: function(res) {
        my.hideLoading();
        if (res.data.code=='10000') {
          //拼装地图展示数据
          var markersArr = [];
          for (var i=0;i<res.data.data.cabinets.length;i++) {
            markersArr.push({
              id: res.data.data.cabinets[i].id,
              title: res.data.data.cabinets[i].shopName,
              detailAddr: res.data.data.cabinets[i].provinceName+res.data.data.cabinets[i].cityName+res.data.data.cabinets[i].districtName+res.data.data.cabinets[i].detailAddr,
              powerbankNum: res.data.data.cabinets[i].powerbankNum,
              canBorrowNum: res.data.data.cabinets[i].canBorrowNum,
              canBackNum: res.data.data.cabinets[i].canBackNum,
              businessHours: res.data.data.cabinets[i].businessHours,
              juli: res.data.data.cabinets[i].juli,
              iconPath: '/assets/images/markers.png',
              longitude: res.data.data.cabinets[i].longitude,
              latitude: res.data.data.cabinets[i].latitude,
              width: 50,
              height: 53,
              shopLogo: res.data.data.cabinets[i].shopLogo
            });
          }

          /*res.data.data.cabinets.map((item, i)=>{
            let idStr ='markers['+i+'].id';
            let titleStr ='markers['+i+'].title';
            let iconPathStr ='markers['+i+'].iconPath';
            let longitudeStr ='markers['+i+'].longitude';
            let latitudeStr ='markers['+i+'].latitude';
            let widthStr ='markers['+i+'].width';
            let heightStr ='markers['+i+'].height';
            _this.setData({
                [idStr]: item.id,
                [titleStr]: item.shopName,
                [iconPathStr]: '/assets/images/markers.png',
                [longitudeStr]: item.longitude,
                [latitudeStr]: item.latitude,
                [widthStr]: 50,
                [heightStr]: 53,
            });
          })*/
          
          _this.setData({
            markers: markersArr,
            markersArr: markersArr  //用来图片上的点，点击事件查询数据用的
          });
        }
        
      },
      fail: function(res) {
        my.hideLoading();
        //console.log(res)
      },
    });
  },

  //获取用户状态
  getMapIndexConf() {
    my.showLoading({
      content: "加载中..."
    });
    let _this = this;
    
    app.http(`${baseApi}/token/rent/getMapIndexConf`, "get", {}, app.get('token'))
       .then( res => {
         console.log(res.data);
         my.hideLoading();
         if (res.data.code = '10000') {
          _this.setData({
            usingStatus: res.data.data.status,
            orderNo: res.data.data.orderNo
          })
         }
         
       })
       .catch( res => {
         my.hideLoading();
         console.log( `===> ${res}` );
       })
  },

  //点击目标 充电宝事件
  handleThisMarker(e){
    const { markerId } = e;
    console.log(markerId)
    this.setData({
      targetChargingStatus: true
    })

    //把选中的标记点数据找到 => 存入targetBattery 中
    for( let i=0; i< this.data.markersArr.length; i++){
      //console.log(this.data.markersArr[i])
      for( let prop in this.data.markersArr[i] ){
        if( markerId == this.data.markersArr[i].id){
          this.setData({
            targetBattery: this.data.markersArr[i]
          });
          return;
        }
      }
    }
  },

  //点击地图 消息目标充电宝弹窗
  handleMapEvent(){
    this.setData({
      targetChargingStatus: false
    })
  },

  //工具栏 - 扫码
  sweepCodeFn(){
    my.scan({
      type: 'qr',
      success: res => {
        console.log(res);
      },
    })
  },

  //工具栏 - 帮助中心
  jumpQuestions(){
    my.navigateTo({
      url: '/pages/memberHelp/memberHelp'
    });
  },

  //工具栏 - 跳转搜索地址页面
  jumpModifyLocation(){
    my.navigateTo({
      url: '/pages/modifyLocation/modifyLocation'
    });
  },

  //工具栏 - 会员中心
  jumpMemberCenter(){
    my.navigateTo({
      url: '/pages/member/member'
    });
  },

  //工具栏 - 附近门店
  jumpShopLists(){
    let _this = this;
    let _lat = _this.data.latitude;
    let _log = _this.data.longitude;
    my.navigateTo({
      url: '/pages/nearbyStore/nearbyStore?latitude=' + _lat + '&longitude=' + _log
    });
  },

  //跳转到订单详情
  toOrderDetail() {
    let _this = this;
    my.navigateTo({
      url: '/pages/memberLeaseDetail/memberLeaseDetail?orderNo=' + _this.data.orderNo
    })
  },

  //跳转到订单支付
  toPaymentOrder() {
    my.navigateTo({
      url: '/pages/paymentOrder/paymentOrder?fromIndex=1'
    });
  },

  


  onLoad(e){
    let _this = this;
    //console.log(app.globalData.userInfo);
    this.mapCtx = my.createMapContext('myMap');

    //初始化定位 => 获取经纬度坐标
    this.getLocation(e);
    
    //取头像信息
    app.getUserInfo()
      .then( res => {
        _this.setData({
          userInfo: res
        })
      })
      .catch( err =>{
        console.log(err)
      });
  },

});
