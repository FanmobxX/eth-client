require('dotenv').config();

const bodyParser = require('koa-bodyparser');
const Koa = require('koa');
const router = require('./api.js');

const app = new Koa();

app.use(bodyParser());

// middleware to output HTTP method and time
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.loog(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// API - authentication required
app.use(router.routes());

// start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Node server started on port ${port}`);
});

module.exports = app;
