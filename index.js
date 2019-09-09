const Koa = require('koa');
const xtpl = require('koa-xtpl');
const path = require('path');
const koaStatic = require('koa-static');
const app = new Koa();
// import 自定义模块
const router = require('./app/routers/index.js');
// import xtpl自定义方法
const xtplApi = require('./app/helpers/view.js');
// post请求
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');
let puppetterHelp = require('./app/helpers/puppetterHelp');

const config = require('./config');
// 解决跨域
// 具体参数我们在后面进行解释
app.use(cors());
// 静态资源目录对于相对入口文件index.js的路径
const staticPath = './static';
app.use(koaStatic(
    // eslint-disable-next-line no-undef
    path.join(__dirname, staticPath)
));
app.use((ctx, next) => {
   
    // view 中的全局变量
    if(ctx.path && ctx.path.indexOf('.html') > -1){
        ctx.state.path = ctx.path.slice(1).split('.')[0];
    }else{
        ctx.state.path = ctx.path.slice(1); // 去掉后缀.html,用于页面上自动载于静态资源
    }
    ctx.state.env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
    return next();
});
app.use(xtpl(
    {
        root: './app/views',
        extname: 'html',
        commands: xtplApi,
    }
));
app.use(bodyParser());
// 添加路由模块
app.use(router.routes()).use(router.allowedMethods());

app.listen(config.port,function(){
    puppetterHelp.init();
    // eslint-disable-next-line no-console
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", config.port, config.port);
});
// eslint-disable-next-line no-console
console.log(`[demo] start-quick is starting at port ${config.port}`)