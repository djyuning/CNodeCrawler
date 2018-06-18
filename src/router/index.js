const Router = require('koa-router');

const Home = require('../controller/home');

let router = new Router();

router.all('/', Home.index);

module.exports = router;
