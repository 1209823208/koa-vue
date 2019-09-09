const UserModel = require('../model/user');
class UserController {
    // 用户登录
    async login(ctx, next) {
        // 获取请求提交的数据
        let name = ctx.request.body.name || '',
            pwd = ctx.request.body.pwd || '';
        let result = {
            code: '',
            message: '',
            data: null,
        }
        try{
            await UserModel.checkLogin({
                name,
                pwd
            })
                .then(res => {
                    result.code = 200;
                    result.message = '获取数据成功';
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
                message: '获取数据失败', 
            }
        }
        ctx.body = result;
    }
    // 用户信息
    async userInfo(ctx, next) {
        let uid = ctx.params.uid;
        let result = {
            code: '',
            message: '',
            data: null,
        }
        if(isNaN(uid)){
            result = {
                code: '500',
                name: 'ERROR_PARAM_TYPE',
                message: '参数错误', 
            }
        }else{
            try{
                await UserModel.getUserInfoById(uid)
                    .then(res => {
                        result.code = 200;
                        result.message = '获取数据成功';
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
                    message: '获取数据失败', 
                }
            }
        }
        ctx.body = result;
    }
    // 获取所有数据-demo
    async getData(ctx, next) {
        let result = {
            code: '',
            message: '',
            data: null,
        }
        await UserModel.selectAllData()
            .then(res => {
                result.code = 200;
                result.message = '获取数据成功';
                result.data = res;
            }).catch(error => {
                result.code = 500;
                result.message = 'fail';
                result.data = error;
            });
        ctx.body = result;
    }
}
module.exports = new UserController();