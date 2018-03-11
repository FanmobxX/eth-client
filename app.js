require('dotenv').config();

const bodyParser = require('koa-bodyparser');
const Koa = require('koa');
const router = require('./api.js');

const app = new Koa();

app.use(bodyParser());

// defaut error handler
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
    ctx.app.emit('error', err, ctx);
  }
});

// middleware to output HTTP method and time
// app.use(async (ctx, next) => {
//   const start = new Date();
//   await next();
//   const ms = new Date() - start;
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
// });

// API - authentication required
app.use(router.routes());

// start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Node server started on port ${port}`);
});

module.exports = app;
