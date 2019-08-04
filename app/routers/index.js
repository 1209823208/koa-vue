const Router = require('koa-router');

const routerIndex = require('../../app/controllers/index');
const router = new Router();

router.get('/',routerIndex.home);
router.get('/home',routerIndex.home);
router.get('/user',routerIndex.user);

module.exports = router;