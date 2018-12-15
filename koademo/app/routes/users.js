// module.exports =  (router) => {
// //   router.get('/user', async function (ctx, next) {
// //     // ctx.body = 'this a users response!';
// //     ctx.response.body = '<h1>user user</h1>'
// //   })
// // }
//
// const router = require('koa-router')()
// // 引入mongo模型
// const Person = require('../dbs/models/person')
//
// router.prefix('/users')
//
// router.get('/', function (ctx, next) {
//   ctx.body = 'this is a users response!'
// })
//
// router.get('/bar', function (ctx, next) {
//   ctx.body = 'this is a users/bar response'
// })
//
//
// router.post('/addPerson', async function (ctx) {
//   // 创建实例
//   const person = new Person({
//     name: ctx.request.body.name,
//     age: ctx.request.body.age
//   })
//
//   let code = 0 // 状态码
//
//   try {
//     await person.save()
//     code = 0
//   } catch(e) {
//     code = -1
//   }
//
//   // 返回状态（成功为0， 错误为-1）
//   ctx.body = {
//     code
//   }
// })
// module.exports = router
