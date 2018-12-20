module.exports = function () {
  const Koa1 = require('koa'),
    route = require('koa-route'),
    websockify = require('koa-websocket');

  const app1 = websockify(new Koa1());
// Regular middleware
// Note it's app.ws.use and not app.use
  app1.ws.use(function (ctx, next) {
    // return `next` to pass the context (ctx) on to the next ws middleware
    return next(ctx);
  });

// Using routes
  app1.ws.use(route.all('/', function (ctx) {
    // `ctx` is the regular koa context created from the `ws` onConnection `socket.upgradeReq` object.
    // the websocket is added to the context on `ctx.websocket`.
    ctx.websocket.on('message', function (message) {
      // do something with the message from client
      console.log(message);
      ctx.websocket.send('服务器和你说:' + '唐嗜好是傻逼' + message);

    });
  }));

  app1.listen(3000);
}


