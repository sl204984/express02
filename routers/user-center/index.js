// 上传图片案例
// 文件脚本攻击？ ===========> 未作处理
const express = require('express');
const QiniuAvatar = require('./qiniu-avatar');
const router = express.Router();

router.post('/qiniu/avatar', QiniuAvatar);

module.exports = router;