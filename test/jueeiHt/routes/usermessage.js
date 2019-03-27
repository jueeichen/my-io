var router = require('koa-router')();

const {UserMessgesModel} = require('../dbs/models/userMsessge');


router.post('/addUser', async function (ctx) {
  const {date, name, address, postcode} = ctx.request.body;
  console.log('addUser', date, name, address, postcode);
  const user = await  UserMessgesModel.findOne({name})
  if (user) {
    ctx.body = {code: 1, msg: '该用户存在'}
  } else {
    let saveUser = await new UserMessgesModel({date, name, address, postcode}).save()
    saveUser && (ctx.body = {
      "code": 0,
      "data": {date, name, address, postcode},
      'msg': '添加成功'
    })


  }
})
router.get('/showUser', async function (ctx) {
  const userAll = await  UserMessgesModel.find()
  if (!userAll) {
    ctx.body = {code: 1, msg: '数据库没有数据'}
  } else {
    ctx.body = {
      "code": 0,
      "data": {userAll},
      'msg': '展示所有数据成功'
    }
  }
})
router.post('/delUser', async function (ctx) {
  const {name} = ctx.request.body;
  const user = await  UserMessgesModel.remove({name})
  if (user.n == 0) {
    ctx.body = {code: 1, msg: '删除失败数据库没有找到这个用户'}
  } else {
    ctx.body = {
      "code": 0,
      "data": {user},
      'msg': '数据删除成功'
    }
  }
})
router.post('/updateUser', async function (ctx) {
  const {date, name, address, postcode,preName} = ctx.request.body;
  console.log('####'+preName);
  const user = await  UserMessgesModel.update(
    {name:preName},
    {"$set":{date, name, address, postcode}},
    {"multi":true,"upsert":false}
  )
  if (!user) {
    ctx.body = {code: 1, msg: '修改失败'}
  } else {
    ctx.body = {
      "code": 0,
      "data": {user},
      'msg': '数据修改成功'
    }
  }
})
router.post('/dimSearch', async function (ctx) {
  const {key} = ctx.request.body;
  const user = await  UserMessgesModel.find({key})
  if (user.n == 0) {
    ctx.body = {code: 1, msg: '删除失败数据库没有找到这个用户'}
  } else {
    ctx.body = {
      "code": 0,
      "data": {user},
      'msg': '数据删除成功'
    }
  }
})

module.exports = router;


