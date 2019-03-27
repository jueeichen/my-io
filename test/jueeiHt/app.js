const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const views = require('koa-views');
const co = require('co');
const convert = require('koa-convert');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser')();
const logger = require('koa-logger');
const cors = require('koa-cors')();


//注册路由
const index = require('./routes/index');
const users = require('./routes/users');
const login = require('./routes/login');
const userm = require('./routes/usermessage');
const ws = require('./routes/websocket');
ws();//webscoket接口

app.use(convert(bodyparser));
app.use(convert(json()));
app.use(convert(logger()));
app.use(convert(require('koa-static')(__dirname + '/public')));
app.use(cors);//解决跨域,需要放到route前面;
app.use(views(__dirname + '/views', {
  extension: 'jade'
}));

// app.use(views(__dirname + '/views-ejs', {
//   extension: 'ejs'
// }));


// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});
//注册路由:
router.use('/', index.routes(), index.allowedMethods());
router.use('/users', users.routes(), users.allowedMethods());
router.use('/login', login.routes(), login.allowedMethods());
router.use('/userm', userm.routes(), userm.allowedMethods());

app.use(router.routes(), router.allowedMethods());
// response

app.on('error', function (err, ctx) {
  console.log(err)
  log.error('server error', err, ctx);
});


module.exports = app;