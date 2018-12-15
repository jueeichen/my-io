// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa')
const Router = require('koa-router')
// 创建一个Koa对象表示web app本身:
const app = new Koa()
const router = new Router()
const views = require('koa-views')
const co = require('co')
const convert = require('koa-convert')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const debug = require('debug')('koa2:server')
const path = require('path')
const cors = require('koa-cors')();
const config = require('./config')
const routes = require('./routes')
// const usersRouter = require('./routes/users.js')
//数据库moogoose:
const mongoose = require('mongoose')
const dbConfig = require('./dbs/config')
mongoose.connect(dbConfig.dbs, {
  useNewUrlParser: true
})
// 引入中间件路径:
const pv = require('./middleware/koa-pv')

const port = process.env.PORT || config.port

// error handler
onerror(app)
app.use(cors);

// middlewares
app.use(bodyparser())
  .use(json())
  .use(logger())
  .use(require('koa-static')(__dirname + '/public'))
  .use(views(path.join(__dirname, '/views'), {
    options: {settings: {views: path.join(__dirname, 'views')}},
    map: {'hjs': 'hogan'},
    extension: 'hjs'
  }))
  .use(router.routes())
  .use(router.allowedMethods())

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - $ms`)
})
app.use(async (ctx, next) => {
  console.log(`${ctx.request.method} ${ctx.request.url}`); // 打印URL
  await next(); // 调用下一个middleware
});

app.use(async (ctx, next) => {
  const start = new Date().getTime(); // 当前时间
  await next(); // 调用下一个middleware
  const ms = new Date().getTime() - start; // 耗费时间
  console.log(`Time: ${ms}ms`); // 打印耗费时间
});

app.use(pv())


router.get('/', async (ctx, next) => {
  // ctx.body = 'Hello World'
  ctx.state = {
    title: 'koa'
  }
  await ctx.render('index', ctx.state)
})


router.get('/home', async (ctx, next) => {
  ctx.response.body = '<h1>HOME page</h1>'
})

router.get('/404', async (ctx, next) => {
  ctx.response.body = '<h1>404 Not Found</h1>'
})
routes(router)


app.on('error', function (err, ctx) {
  console.log(err)
  logger.error('server error', err, ctx)
})

module.exports = app.listen(config.port, () => {
  console.log(`Listening on http://localhost:${config.port} 已经连接`)
})
