const STATIC_PORT = 8002;
const NODE_PORT = 3000;
const redisDevConfig = {
    port: 6379, // 端口
    host: '127.0.0.1', // 地址
    //password: 'auth',  //访问密码
};
const redisProConfig = {
    port: 6379, // 端口
    host: '127.0.0.1', // 地址
    //password: 'auth',  //访问密码
};
module.exports = {
    devStaticHost: `//127.0.0.1:${STATIC_PORT}/js`,
    productionAsset: `/dist`,
    port: NODE_PORT,
    environment: {
        UrlPrefix: `//127.0.0.1:${NODE_PORT}`,
    },
    redisConfig: {
        redisDevConfig,
        redisProConfig,
    },
    
};