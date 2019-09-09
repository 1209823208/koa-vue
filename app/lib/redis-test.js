const redisConn = require('./redis');
class RedisClass{
    constructor(){
        this.redis = null;
    }
    connToredis() { // 创建连接对象
        return new Promise((resolve, reject) => {  
            if(this.redis) {
                resolve(true) //已创建
            } else {
                redisConn()
                    .then(resp => {
                        this.redis = resp;
                        resolve(true);
                    })
                    .catch(err => { 
                        reject(err);
                    })
            }
        })
    }
    setCommand(id, data, expire) { //增/改
        if(expire === null || expire === undefined) {
            return this.redis.set(`test-${id}`, JSON.stringify(data))
                .then(resp => {
                    return resp;
                })
                .catch(err => {
                    return err;
                })
        }
        return this.redis.set(`test-${id}`, JSON.stringify(data), 'ex', expire)
            .then(resp => { //ex 为过期时间，单位为 秒
                return resp;
            })
            .catch(err => {
                return err;
            })
    }
    getCommand(id){ // 查
        return this.redis.get(`test-${id}`)
            .then((resp)=>{
                return resp;
            })
            .catch((err)=>{
                return err;
            })
    }
    delCommand(id){ // 删
        return this.redis.del(`test-${id}`)
            .then((resp)=>{
                return resp;
            })
            .catch((err)=>{
                return err;
            })
    }
    multiCommand(id, data) {
        return this.redis.multi()
            .set(`test-${id}`, JSON.stringify(data))
            .get(`test-${id}`)
            .exec((err, resp) => {
                if(err) {
                    return err;
                }
                return resp;
            }) 
    }
}
module.exports = new RedisClass();
// 调用上面对象，实现 redis操作
// let newRedisClass = new RedisClass(); // 创建实例对象
// async function test(){
//     let isConnect = await newRedisClass.connToredis();
//     if(isConnect){
//         let setVal = await newRedisClass.setCommand(123456, {name: 'feifeiyu'}); //增
//         console.log('setVal', setVal);
//         let getVal = await newRedisClass.getCommand(123456); //查
//         console.log('getVal', getVal);
//         let updateVal = await newRedisClass.setCommand(123456, {name: 'feifeiyu3'}); //改
//         console.log('update', updateVal);
//         let getUpdateVal = await newRedisClass.getCommand(123456);//查
//         console.log('getUpdateVal', getUpdateVal);
//         let delVal = await newRedisClass.delCommand(123456); //删
//         console.log('delete', delVal);
//         let getDelVal = await newRedisClass.getCommand(123456); //查
//         console.log('getDelVal', getDelVal);
//         let getMulVal = await newRedisClass.multiCommand(123457, {name: 'feifeiyu2',age: 21});
//         console.log('getMulVal', getMulVal);
//     }
// }
