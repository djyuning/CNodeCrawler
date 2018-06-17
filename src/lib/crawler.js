const cheerio = require('cheerio');
const http = require('http');
const https = require('https');
const iconv = require('iconv-lite');

const getHttp = function (url, options) {
	return new Promise(function (resolve, reject) {

		options = Object.assign({}, {
			callback: null,
			timeout: 60000,
			charset: 'utf-8',
		}, options);

		if (!url) return console.error('请求地址错误：' + url);

		https.get(url, function (sres) {
			let chunks = [];

			sres.on('data', chunk => chunks.push(chunk));

			sres.on('end', function () {
				let html = iconv.decode(Buffer.concat(chunks), options.charset);
				resolve(cheerio.load(html, {
					decodeEntities: false,
				}));
			});

			sres.on('error', error => reject(error));

		});

	});
};

module.exports = {
	getHttp,
};
