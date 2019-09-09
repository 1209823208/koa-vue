import MUtil from './axios-service.js';
const _mm = new MUtil();
class Post {
    // 获取所有数据
    fetchData() {
        let url = 'c-post/allPosts',
            params = {};
        return _mm.get(url, params, false).then((res) => {
            return res;
        });
    }
    // 新增数据
    addData(paramsObj){
        let url = 'c-post/add',
            params = {
                ...paramsObj
            };
        return _mm.post(url, params, {}, false).then((res) => {
            return res;
        });
    }
    // 编辑
    editData(paramsObj){
        let url = `c-post/edit/${paramsObj.id}`,
            params = {
                ...paramsObj
            };
        return _mm.post(url, params, {}, false).then((res) => {
            return res;
        });
    }
    // 删除
    delData(paramsObj){
        let url = `c-post/del`,
            params = {
                ...paramsObj
            };
        return _mm.delete(url, params, false).then((res) => {
            return res;
        });
    }
}
export default new Post();