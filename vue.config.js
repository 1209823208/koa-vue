
let path = require('path')
let glob = require('glob')
//配置pages多页面获取当前文件夹下的html和js
function getEntry(globPath) {
	let entries = {},
		tmp, pathname;

	glob.sync(globPath).forEach(function(entry) {
		tmp = entry.split('/').splice(-3);
		pathname = tmp[1];
		entries[pathname] = {
			entry: 'src/' + tmp[0] + '/' + tmp[1] + '/' + 'index' + '.js',
			template: 'app/views/' + tmp[1] + '.html',
			title: tmp[1]+'.html',
			filename: 'html/'+tmp[1]+'.html'
		};
	});
	return entries;
}

let pages = getEntry('./src/pages/**?/*.js');

module.exports = {
	publicPath: process.env.NODE_ENV === 'production'
    ? '../dist/'
    : '/',
	outputDir:'./static/dist',
    pages,
}