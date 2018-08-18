// 上传图片案例
// 文件脚本攻击？ ===========> 未作处理
const express = require('express');
const ShoppingUpload = require('./shopping');
const AvatarUpload = require('./avatar');
const QiniuShopping = require('./qiniu-shopping');
const router = express.Router();

router.post('/avatar', AvatarUpload.upload, AvatarUpload.callback);
router.post('/shopping', ShoppingUpload.upload, ShoppingUpload.callback);
router.post('/qiniu/shopping', QiniuShopping);
module.exports = router;