var router = require('koa-router')();
const filter = {password: 0, __v: 0} // 查询的过滤(去除文档中的指定属性)
const md5 = require('blueimp-md5')
const {UserModel, ChatModel} = require('../dbs/models/reg');
router.get('/a', function (ctx, next) {
  ctx.body = 'this a users response!';
});
/*注册一个用户注册的路由:*/
router.post('/register', async function (ctx) {
  const {username, password, type} = ctx.request.body;
  console.log('register', username, password, type);
  const user = await  UserModel.findOne({username})
  if (user) {
    ctx.body = {code: 1, msg: '该用户已注册请重新输入'}
  } else {
    await new UserModel({username, password: md5(password), type}).save()
    ctx.body = {
      "code": 0,
      "data": {username, type},
      'msg': '注册成功'
    }
  }
})
/*注册一个用户登录的路由:*/
router.post('/login', async function (ctx) {
  const {username, password} = ctx.request.body;
  console.log('login', username, password);
  const user = await  UserModel.findOne({username, password: md5(password)}, filter)
  if (user) {
    ctx.body = {
      'code': 0,
      'data': user,
      'msg': '登录成功'
    }
    console.log('登录成功');
  } else {
    ctx.body = {
      'code': 1,
      'msg': '用户名或者密码错误'
    }
    console.log('登录失败');
  }
});
module.exports = router;
