const ioredis = require('ioredis'); // 引入 ioredis
// redis配置
const redisEnvironmentConfig = require('../../config');
let redisConfig = redisEnvironmentConfig.redisDevConfig;
if( process.env.NODE_ENV === 'production' ) {
    redisConfig = redisEnvironmentConfig.redisProConfig;
}
//连接redis 
let clientCreate = (config, callback_) => {
    let redis = new ioredis(config)
    redis.on('connect', () => { // 根据 connect 事件判断连接成功
        callback_(null, redis); //链接成功， 返回 redis 连接对象
    })
    redis.on('error', (err) => { //根据 error 事件判断连接失败
        callback_(err, null); // 捕捉异常， 返回 error
    })
}
let redisConn = (options) => {   
    let config = options || redisConfig 
    return new Promise((resolve, reject) => { // 返回API调用方 一个 promise 对象
        clientCreate(config, (err, conn) => {
            if(err) {
                reject(err); // 返回 err
            }
            resolve(conn); //返回连接对象
        })
    })
}
module.exports = redisConn
