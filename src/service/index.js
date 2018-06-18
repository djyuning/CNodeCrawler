const Crawler = require('../lib/crawler');

module.exports = {

  getData: async (url) => {
    let titles = [];
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
      
    });

    return titles;
  }

};
