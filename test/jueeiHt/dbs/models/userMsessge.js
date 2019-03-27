// const md5 = require('blueimp-md5');

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/jueei_ping',{ useNewUrlParser: true });
//库不存在会帮你创建;
const connection = mongoose.connection;
//用来监听:
connection.on('connected', function () {
  console.log('user_message连接数据库成功');

})


// 约束对象

const userSchema = mongoose.Schema({
  name: {type: String, required: true}, // 用户名
  date: {type: String, required: true}, // 日期
  address: {type: String, required: true}, // 地址
  postcode: {type: String, required: true}, // 邮箱
});

// 集合的名称为:UserMessges:
const UserMessgesModel = mongoose.model('usermessges', userSchema);

exports.UserMessgesModel = UserMessgesModel;




