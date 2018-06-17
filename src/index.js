const path = require('path');
const Koa = require('koa');
const route = require('koa-route');
const render = require('koa-ejs');

const app = new Koa();

render(app, {
  root: path.join(__dirname, 'view'),
  viewExt: 'html',
  cache: false,
  debug: true
});

// 首页
app.use(route.get('/', async ctx => {
  ctx.body = 'Hello World';

  await ctx.render('index');
}));

// 404
app.use(route.all('*', async ctx => {
  ctx.response.status = 404;
  ctx.response.body = '<h1>Page Not Found</h1>';
  await ctx.render('404');
}));

app.listen(3000);