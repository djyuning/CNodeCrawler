const path = require('path');
const Koa = require('koa');
const route = require('koa-route');
const koaBody = require('koa-body');
const static = require('koa-static');
const render = require('koa-ejs');

const Crawler = require('./lib/crawler');

const app = new Koa();

app.use(koaBody());

render(app, {
  root: path.join(__dirname, 'view'),
  layout: 'Layout/main',
  viewExt: 'html',
  cache: false,
  debug: false,
});

// 处理静态资源
app.use(static(path.join(__dirname, '/static')));

// 首页
app.use(route.all('/', async ctx => {
    let titles = [];

    ctx.state = {
      titles,
    };

    if (ctx.request.method === 'POST') {
      let params = ctx.request.body;
      let url = params.url;
      let $ = await Crawler.getHttp(url);

      $('#topic_list .topic_title').each(function (idx, element) {
        let $element = $(element);

        // 获取标题
        let title = $element.text();
        title = title.replace(/(\s+){3,}/g, '');
        title = title.replace(/(\\n|\\r|\\t)}/g, '');

        // 获取连接地址
        let href = url + $element.attr('href').substr(1);

        titles.push({
          title,
          href,
        });

        ctx.state = {
          titles,
        };

      });
    }

    await ctx.render('Index/index');
  }
));

app.listen(3000, () => {
  console.log('server is starting at port 3000');
});
