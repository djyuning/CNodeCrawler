const path = require('path');
const Koa = require('koa');
const route = require('koa-route');
const static = require('koa-static');
const render = require('koa-ejs');

const app = new Koa();

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
	await ctx.render('Index/index');
}));

// 404
app.use(route.all('*', async ctx => {
	ctx.response.status = 404;
	ctx.response.body = '<h1>Page Not Found</h1>';
	await ctx.render('404');
}));

app.listen(3000, () => {
	console.log('server is starting at port 3000');
});
