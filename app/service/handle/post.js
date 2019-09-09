const PostModel = require('../model/post');
class PostController {
    // 所有文章
    async getAllPostData(ctx){
        let result = {
            code: '',
            message: '',
            data: null
        }
        try{
            await PostModel.selectAllData()
                .then(res => {
                    result.code = 200;
                    result.message = 'sucess';
                    result.data = res
                }).catch(error => {
                    result.code = 500;
                    result.message = 'fail';
                    result.data = error;
                })
        }catch(err){
            result = {
                code: '500',
                name: 'ERROR_DATA',
                message: '获取数据失败～', 
            }
        }
        ctx.body = result;
    }
    // 新增
    async insitePostData(ctx) {
        // 获取请求提交的数据
        let name = ctx.request.body.name || '',
            title = ctx.request.body.title || '',
            content = ctx.request.body.content || '',
            moment = new Date().getTime();
        let result = {
            code: '',
            message: '',
            data: null,
        }
        try{
            await PostModel.insertPosts( [name,title,content,moment]
            )
                .then(res => {
                    result.code = 200;
                    result.message = '插入数据成功～';
                    result.data = res;
                }).catch(error => {
                    result.code = 500;
                    result.message = 'fail';
                    result.data = error;
                });
        }catch(err){
            result = {
                code: '500',
                name: 'ERROR_DATA',
                message: '插入数据失败～', 
            }
        }
        ctx.body = result;
    }
    //删除文章
    async getDeleteHandle(ctx){
        // 127.0.0.1:8000/c-post/del?postId=3
        let id = ctx.request.query.id,
            result = {
                code: '',
                message: '',
                data: null
            }
        await PostModel.deletePosts(id)
            .then(res => {
                result.code = 200;
                result.message = 'sucess';
                result.data = res
            }).catch(error => {
                result.code = 500;
                result.message = 'fail';
                result.data = error;
            })
        ctx.body = result;
    }
    // handel edit fun
    async getEditHandle(ctx) {
        // 127.0.0.1:8000/c-post/edit/3
        let {
                title,
                content
            } = ctx.request.body,
            id = ctx.params.postId,
            result = {
                code: '',
                message: '',
                data: null
            }
        await PostModel.updatePosts([title, content, id])
            .then(res => {
                result.code = 200;
                result.message = 'sucess';
                result.data = res;
            }).catch(error => {
                result.code = 500;
                result.message = 'fail';
                result.data = error;
            })
        ctx.body = result;
    }


}
module.exports = new PostController();