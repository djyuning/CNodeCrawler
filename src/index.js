const config = require('./config/common');
const path = require('path');
const Koa = require('koa');
const koaBody = require('koa-body');
const static = require('koa-static');
const render = require('koa-ejs');

const router = require('./router/index');

const app = new Koa();

app.use(koaBody());

render(app, {
  root: './src/view', // 视图文件所在目录
  layout: 'Layout/main', // 默认布局文件
  viewExt: 'html', // 模板文件格式
  cache: false, // 启用模板缓存
  debug: false, // 启用 DEBUG
});

// 处理静态资源
app.use(static(path.join(__dirname, '/static')));

// 路由初始化
app.use(router.routes(), router.allowedMethods());

app.listen(config.port, () => {
  console.log('服务启用成功 http://localhost:3000');
});
