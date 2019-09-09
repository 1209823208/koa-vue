const path = require('path');
const fs = require('fs');
const Busboy = require('busboy');
class FileController {
    constructor() {
        this.mkdirsSync = this.mkdirsSync.bind(this);
        this.getSuffixName = this.getSuffixName.bind(this);
    }
    /**
     * 同步创建文件目录
     * @param  {string} dirname 目录绝对地址
     * @return {boolean}        创建目录结果
     */
    mkdirsSync( dirname ) {
        if (fs.existsSync( dirname )) {
            return true
        } else if (this.mkdirsSync( path.dirname(dirname)) ) {
            fs.mkdirSync( dirname )
            return true
        }
        return false;
    }
    /**
     * 获取上传文件的后缀名
     * @param  {string} fileName 获取上传文件的后缀名
     * @return {string}          文件后缀名
     */
    getSuffixName( fileName ) {
        let nameList = fileName.split('.')
        return nameList[nameList.length - 1]
    }
    // 上传过程
    fileUploadProcess (ctx) {
        let req = ctx.req;
        let options = {
            fileType: 'album',
            path: path.join( __dirname, 'upload-files' ),
        }
        let busboy = new Busboy({headers: req.headers});
        // 获取类型
        let fileType = options.fileType || 'common';
        let filePath = path.join( options.path, fileType);
        let fileControllerClass = new FileController();
        // 创建目录
        fileControllerClass.mkdirsSync( filePath );
        return new Promise((resolve, reject) => {
            // eslint-disable-next-line no-console
            console.log('文件上传中...')
            let result = { 
                success: false,
                formData: {},
            }
        
            // 解析请求文件事件
            busboy.on('file', function(fieldname, file, filename) {
                let fileName = Math.random().toString(16).substr(2) + '.' + fileControllerClass.getSuffixName(filename)
                let _uploadFilePath = path.join( filePath, fileName )
                let saveTo = path.join(_uploadFilePath)
            
                // 文件保存到制定路径
                file.pipe(fs.createWriteStream(saveTo))
            
                // 文件写入事件结束
                file.on('end', function() {
                    result.success = true
                    result.message = '文件上传成功';
                    // eslint-disable-next-line no-console
                    console.log('文件上传成功！')
                })
            })
            // 解析结束事件
            busboy.on('finish', function( ) {
                // eslint-disable-next-line no-console
                console.log('文件上结束')
                resolve(result)
            })
        
            // 解析错误事件
            busboy.on('error', function(err) {
                // eslint-disable-next-line no-console
                console.log('文件上出错')
                result.message = err;
                reject(result)
            })
            req.pipe(busboy)
        })        
    }
    // 上传方法
    async fileUpload (ctx){
        let fileControllerClass = new FileController();
        let result = {
            code: '',
            message: '',
            data: null
        }
        await fileControllerClass.fileUploadProcess(ctx)
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
}
module.exports = new FileController();