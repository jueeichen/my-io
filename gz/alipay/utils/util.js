const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/*日期格式化*/
const fmtDate = (d,type) => {
    var type = type || 1;
    var date =  new Date(d);
    var y = 1900+date.getYear();
    var m = "0"+(date.getMonth()+1);
    var d = "0"+date.getDate();
    if(type==1){
        return y+"-"+ m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);
    }
    else{
        return m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);
    }
}

const baseApi = "http://djts.ygs001.com/";       
const testApi = "https://www.easy-mock.com/mock/5c7755477163345f2e2eccbd/xcx/";        //测试接口
const appId = "2019030163431465";               //appId
const mapKey = "ca67813652778a6673cbf0772982e951";
const hotLine = 4008521453;

module.exports = {
  formatTime: formatTime,
  fmtDate: fmtDate,
  baseApi: baseApi,
  appId: appId,
  mapKey: mapKey,
  hotLine: hotLine,
  testApi: testApi
}
