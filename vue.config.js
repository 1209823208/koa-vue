
let path = require('path');
let glob = require('glob');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
let ManifestPlugin = require('webpack-manifest-plugin');
const manifest = require('./manifest.json');
//配置pages多页面获取当前文件夹下的html和js
function getEntry(globPath) {
	let entries = {},
		tmp, pathname;

	glob.sync(globPath).forEach(function(entry) {
		tmp = entry.split('/').splice(-3);
		pathname = tmp[1];
		entries[pathname] = {
			entry: 'src/' + tmp[0] + '/' + tmp[1] + '/' + 'index' + '.js',
			// 输出html
			template: 'app/views/' + tmp[1] + '.html',
			title: tmp[1]+'.html',
			filename: 'html/'+tmp[1]+'.html'
		};
	});
	return entries;
}

let pages = getEntry('./src/pages/**?/*.js');
console.log('----------pages-----------',pages)
let hashLen = 8;
const mode = process.env.NODE_ENV;
module.exports = {
	publicPath: mode === 'production' ? '../dist/' : '/',
	outputDir:'./static/dist',
	 // 修改打包后js文件名
	configureWebpack: { // webpack 配置
		output: { // 输出重构  打包编译后的 文件名称  【模块名称.版本号.js】
			filename: mode === 'production' ? `js/[name]-[chunkhash:${hashLen}].js` : `js/[name].js`,
			chunkFilename:  mode === 'production' ? `js/[name]-[chunkhash:${hashLen}].js` : `js/[name].js`,
		},
		// 修改打包后css文件名
		plugins: [
			new MiniCssExtractPlugin({
			filename: 'production' ? `css/[name]-[chunkhash:${hashLen}].css` : `css/[name].css`,
			chunkFilename: 'production' ? `css/[name]-[chunkhash:${hashLen}].css` : `css/[name].css`,
			}),
			new ManifestPlugin({
                fileName: 'manifest.json',
                seed: manifest,
                publicPath: './',
            })
		]
	},
	pages,
	devServer: {
		port: 8002, // 端口号
	},
}