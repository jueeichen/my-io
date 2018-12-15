const md5 = require('blueimp-md5');

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/jueei_ping',{ useNewUrlParser: true });
//库不存在会帮你创建;
const connection = mongoose.connection;
//用来监听:
connection.on('connected', function () {
  console.log('连接数据库成功');

})


// 约束对象

const userSchema = mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  type: {type: String},
})

// 集合的名称为:users:
const UserModel = mongoose.model('users', userSchema);

function testSave() {
  const user = {username: 'a1', password: md5('123'), type: 'laoban'};
  const userModel = new UserModel(user)
  userModel.save(function (err, user) {
    console.log(err, user);
  })

}
//
// testSave();

function testFind() {
  // findOne() 返回一个匹配的user, 如果没有返回null
  UserModel.findOne({_id: '5b4da9aeba740b6769f4385b'}, function (error, user) {
    console.log('findOne', error, user)
  })
  // find() 返回所有匹配的user组成的数组, 如果没有返回[]
  UserModel.find({_id: '5b4da9aeba740b6769f4385b'}, function (error, users) {
    console.log('find', error, users)
  })
}

// testFind()


function testRemove(type) {
  UserModel.remove({username: type}, function (error, doc) {
    console.log('remove', error, doc) // { n: 1, ok: 1 } n:1代表删除了1条记录
  })
}

// testRemove('z2')
