const express = require('express');
var md5 = require('md5-node');
const {
  createId
} = require('../../utils');
const {
  select,
  insert
} = require('../../mysql');

const router = express.Router();

router.post('/', (req = {}, res) => {
  // console.log('req', req);
  const {
    nickname,
    password,
    mobile,
    submissionDate
  } = req.query || {};
  const idLen = 20;
  const timeStamp = (new Date()).getTime().toString(16);
  const randomId = createId(idLen - timeStamp.length); // 1是 splitIndex 的长度
  const userId = randomId + timeStamp;
  const token = md5(submissionDate, userId);
  const avatar = 'static/avatar/lovely.jpeg';
  const credit = 100;

  res.json({
    data: {
      nickname,
      password,
      avatar,
      mobile,
      token,
      userId,
      credit // 信用值
    }, // 返回的数据
    status: 0, // 状态码
    statusInfo: '',
    ok: true
  });
});

module.exports = router;