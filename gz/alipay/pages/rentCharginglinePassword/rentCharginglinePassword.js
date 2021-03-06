import { baseApi } from "/utils/util"

const app = getApp();

Page({
  data: {
    cutDownTime: '',
    endTime: '',   //截止时间
    timer: null,
  },

  lineCreatePwd(orderNo) {
    let _this = this;

    var token = app.get('token');

    console.log(token);
    my.httpRequest({
      url: `${baseApi}token/order/lineCreatePwd?orderNo=` + orderNo,
      method: 'get',
      headers:{
        'token': token
      },
      dataType: 'json',
      success: function(res) {
        console.log(res.data);
        if (res.data.code=='10000') {
          _this.setData({
            linePassword: res.data.data.linePwd,
            endTime: res.data.data.endTime,
          })

          //计算倒计时
          _this.countDown(_this);
        }
        
      },
      fail: function(res) {
        console.log(res)
      },
    });
  },

  onLoad(e) {
    console.log(e);
    //加载页面的时候，也要清除定时器
    clearInterval(this.data.timer);

    this.lineCreatePwd(e.orderNo);
    // const that = this;
    // that.countDown(that);
  },

  //倒计时
  countDown(that){
    //获取当前时间  
    let timer = null;
    let date = new Date();  
    let now = date.getTime(); 
    //时间差  
    let leftTime = this.data.endTime - now; 

    //定义变量 d,h,m,s保存倒计时的时间  
    let d,h,m,s;  
    if (leftTime>=0) {
        // d = Math.floor(leftTime/1000/60/60/24);  
        h = Math.floor(leftTime/1000/60/60);  
        m = Math.floor(leftTime/1000/60%60);  
        s = Math.floor(leftTime/1000%60);    

        //时间补零
        // d = that.timeFormat(d);
        h = that.timeFormat(h);
        m = that.timeFormat(m);
        s = that.timeFormat(s);
        
        that.setData({
          cutDownTime: `${h} ：${m} ：${s}`
        })
        
        //递减
        this.data.timer = setTimeout(function(){
          that.countDown(that);
        }, 1000);
    }
    else{
      that.setData({
        djsTime: "时间到了！"
      })
      clearInterval(timer);
      return;
    }
  },

  //日期格式化， 3 => 03
  timeFormat(param){
    return param < 10 ? '0' + param : param; 
  },

  //卸载页面的时候，清除定时器
  onUnload(){
    clearInterval(this.data.timer);
  }

});
