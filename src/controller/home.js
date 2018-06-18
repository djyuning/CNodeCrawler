const BaseService = require('../service/index');

module.exports = {

  /**
   * 首页
   * @param ctx
   * @param next
   * @return {Promise<void>}
   */
  index: async (ctx, next) => {
    ctx.state = {
      titles: [],
    };

    if (ctx.request.method === 'POST') {
      let params = ctx.request.body;
      let url = params.url;
      ctx.state.titles = await BaseService.getData(url);
    }

    await ctx.render('Home/index');
    next();
  },

};
