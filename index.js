const Koa = require('koa');
const xtpl = require('koa-xtpl');
const path = require('path');
const koaStatic = require('koa-static');
const app = new Koa();
// import 自定义模块
const router = require('./app/routers/index.js');

// 静态资源目录对于相对入口文件index.js的路径
const staticPath = './static';
app.use(koaStatic(
    path.join( __dirname,  staticPath)
));
// 添加模板引擎
app.use(xtpl(
    {
        root: './static/dist/html',
        extname: 'html',
        commands: {},
    }
));
// 添加路由模块
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000)
// eslint-disable-next-line no-console
console.log('[demo] start-quick is starting at port 3000')