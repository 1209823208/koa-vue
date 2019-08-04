let home = async function (ctx, next) {
    await ctx.render('home', {
        title: '主页面',
    });

    return next();
};
let user = async function (ctx, next) {
    await ctx.render('user', {
        title: '用户页面',
    });

    return next();
};
module.exports = {
    home,
    user,
};