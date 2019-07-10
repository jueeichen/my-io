const router = require('koa-router')()
const userService = require('../controllers/mysqlConfig');

router.prefix('/users')

//获取所有用户(GET请求)
router.get('/', async (ctx, next) => {
  // console.log(ctx.session.username)
  ctx.body = await userService.findAllUser().then(res=>{

      return {code:10000,data:res}
  })
})

// 增加用户(POST请求)
router.post('/add', async (ctx, next) => {
// let arr = []
//   arr.push(ctx.request.body['name']);
//   arr.push(ctx.request.body['pass']);
//   arr.push(ctx.request.body['auth']);
let name = ctx.request.body['name'];
let pass = ctx.request.body['pass'];
let auth = ctx.request.body['auth'];

  let obj = {name,pass,auth};



  await userService.addUserData({name,pass,auth})
      .then((data) => {

          let r = '';
          if (data.affectedRows != 0) {
              r = 'ok';
          }
          ctx.body = {
              data: r,
              code: 10000
          }
      }).catch(() => {
          ctx.body = {
              data: 'err',
              code: 10001
          }
      })
})

module.exports = router