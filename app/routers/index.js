const Router = require('koa-router');
const router = new Router();
// web页面路由
const routerIndex = require('../../app/controllers/index');
// 接口API
const userAPI = require('../service/handle/user');
const postAPI = require('../service/handle/post');
const fileAPI = require('../service/handle/file');
const puppetterHelp = require('../helpers/puppetterHelp');

// web页面路由
router.get('/',routerIndex.home);
router.get('/home',routerIndex.home);
router.get('/user',routerIndex.user);
router.get('/file',routerIndex.file);
// 接口API路由
router.get('/user/userInfo/:uid',userAPI.userInfo);
router.get('/user/getData',userAPI.getData);
router.post('/login',userAPI.login);
router.get('/c-post/allPosts', postAPI.getAllPostData);
router.post('/c-post/add',postAPI.insitePostData);
router.delete('/c-post/del',postAPI.getDeleteHandle);
router.post('/c-post/edit/:postId',postAPI.getEditHandle);
router.post('/file/upload',fileAPI.fileUpload);
//图片生成接口
router.post("/convert", puppetterHelp.newTask);
module.exports = router;