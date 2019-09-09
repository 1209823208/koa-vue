const newRedisClass = require('../lib/redis-test');
let home = async function (ctx, next) {
    let isConnect = await newRedisClass.connToredis();
    let currentHomePV = 0;
    if(isConnect){
        const key = 'homePV3';
        currentHomePV = await newRedisClass.getCommand(key); //查
        currentHomePV = currentHomePV !== null ? Number(currentHomePV) + 1 : 1;
        let setVal = await newRedisClass.setCommand(key, currentHomePV); //增
        currentHomePV = await newRedisClass.getCommand(key); //查
    }
    await ctx.render('home', {
        title: '主页面',
        currentHomePV,
    });

    return next();
};
let user = async function (ctx, next) {
    await ctx.render('user', {
        title: '用户页面',
    });

    return next();
};
let file = async function (ctx, next) {
    await ctx.render('file', {
        title: '上传文件',
    });

    return next();
};
module.exports = {
    home,
    user,
    file,
};