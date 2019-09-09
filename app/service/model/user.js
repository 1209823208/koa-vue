const query = require('../common/mysql');

// 获取所有数据
async function selectAllData( ) {
    let sql = 'SELECT * FROM user';
    let dataList = await query( sql );
    return dataList;
}
// 通过uid获取用户信息
async function getUserInfoById(id) {
    let sql = `select * from user where id="${id}";`
    let dataList = await query( sql );
    return dataList;
}
// 通过name和pwd登录
async function checkLogin(params) {
    let sql = `select * from user where name="${params.name}" and pwd="${params.pwd}";`
    let dataList = await query( sql );
    return dataList;
}
module.exports = {
    selectAllData,
    getUserInfoById,
    checkLogin,
}