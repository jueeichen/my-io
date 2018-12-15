const md5 = require('blueimp-md5')
const {UserModel, ChatModel} = require('../dbs/models/reg');
const Person = require('../dbs/models/person')
const filter = {password: 0, __v: 0} // 查询的过滤(去除文档中的指定属性)
module.exports = (router) => {
  router.get('/welcome', async function (ctx, next) {
    ctx.response.body = '<h1>welcome</h1>'
  })
  router.get('/user', async function (ctx, next) {
    // ctx.body = 'this a users response!';
    ctx.response.body = '<h1>user user</h1>'
  })
  router.post('/addPerson', async function (ctx) {
    // 创建实例
    const person = new Person({
      name: ctx.request.body.name,
      age: ctx.request.body.age
    })

    let code = 0 // 状态码

    try {
      await person.save()
      code = 0
    } catch (e) {
      code = -1
    }

    // 返回状态（成功为0， 错误为-1）
    ctx.body = {
      code
    }
  })
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
}
