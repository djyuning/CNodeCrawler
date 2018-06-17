const cheerio = require('cheerio');
const http = require('http');
const https = require('https');
const iconv = require('iconv-lite');

let urlBase = 'https://cnodejs.org/';

// 读取 URL
https.get(urlBase, function (sres) {
  let chunks = [];

  sres.on('data', function (chunk) {
    chunks.push(chunk);
  });

  sres.on('end', function () {
    let titles = [];

    let html = iconv.decode(Buffer.concat(chunks), 'utf-8');

    let $ = cheerio.load(html, {
      decodeEntities: false,
    });

    $('#topic_list .topic_title').each(function (idx, element) {
      let $element = $(element);

      // 获取标题
      let title = $element.text();
      title = title.replace(/(\s+){3,}/g, '');
      title = title.replace(/(\\n|\\r|\\t)}/g, '');

      // 获取连接地址
      let href = urlBase + $element.attr('href').substr(1);

      titles.push({
        title,
        href,
        contents,
      });

    });

    console.log(titles);
  });
});
