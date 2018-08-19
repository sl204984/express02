// 上传图片案例
// 文件脚本攻击？ ===========> 未作处理
const express = require('express');
const ShoppingImgs = require('./shopping-imgs');
const AvatarImg = require('./avatar');
const QiniuShopping = require('./qiniu-shopping');
const Shopping = require('./shopping');
const router = express.Router();

router.post('/avatar', AvatarImg.upload, AvatarImg.callback);
router.post('/shopping/imgs', ShoppingImgs.upload, ShoppingImgs.callback);
router.post('/qiniu/shopping', QiniuShopping);
router.post('/shopping', Shopping);

module.exports = router;