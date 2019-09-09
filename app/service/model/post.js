const query = require('../common/mysql');

// 获取所有数据
async function selectAllData( ) {
    let sql = 'SELECT * FROM posts';
    let dataList = await query( sql );
    return dataList;
}
// 新增文章
async function insertPosts(value) {
    let _sql = `insert into posts set name=?,title=?,content=?,moment=?;`
    return query(_sql, value);
}
// 编辑文章
async function updatePosts(value) {
    let _sql = `update posts set title=?,content=?where id=?; `
    return query(_sql, value)
}
// 删除文章
async function deletePosts(id){
    let _sql = `delete from posts where id = ${id}`
    return query(_sql)
}
module.exports = {
    selectAllData,
    insertPosts,
    updatePosts,
    deletePosts
}