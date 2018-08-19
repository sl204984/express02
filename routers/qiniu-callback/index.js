/**
 * @author shenliang
 * 用来处理七牛回调
 */

const express = require('express');
const router = express.Router();
const ShoppingCallback = require('./shopping');

router.post('/shopping/callback', ShoppingCallback);
module.exports = router;