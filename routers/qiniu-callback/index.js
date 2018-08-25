/**
 * @author shenliang
 * 用来处理七牛回调
 */

const express = require('express');
const router = express.Router();
const ShoppingCallback = require('./shopping');
const AvatarCallback = require('./avatar');

router.post('/shopping/callback', ShoppingCallback);
router.post('/avatar/callback', AvatarCallback);
module.exports = router;