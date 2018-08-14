const express = require('express');
var md5 = require('md5-node');
const {
  createId
} = require('../../utils');
const db = require('../../mysql');

const router = express.Router();

router.post('/', async (req = {}, res) => {
  // console.log('req', req);
  const {
    nickname,
    password,
    mobile,
    submissionDate
  } = req.query || {};

  const {
    err: errSelect,
    results: resultsSelect
  } = await db.select({
    tableName: 'user_base_info',
    clause: `nickname="${nickname}"`,
  });
  if (errSelect) {
    res.json({
      data: '',
      status: 0,
      statusInfo: '数据库查询异常',
      ok: false
    });
    return;
  }
  console.log('resultsSelect', resultsSelect);
  if (resultsSelect.length > 0) {
    res.json({
      data: '', // 返回的数据
      status: 0, // 状态码
      statusInfo: '该用户已经存在',
      ok: false
    });
    return;
  }
  const idLen = 20;
  const timeStamp = new Date().getTime().toString(36);
  const randomId = createId(idLen - timeStamp.length); // 1是 splitIndex 的长度
  const userId = randomId + timeStamp;
  const token = md5(submissionDate, userId);
  const avatar = 'static/avatar/lovely.jpeg';
  const credit = 100;
  const {
    err: errInsert,
    results: resultsInsert
  } = await db.insert({
    tableName: 'user_base_info',
    data: {
      user_id: userId,
      nickname,
      avatar,
      token,
      password,
      submission_date: submissionDate,
      mobile,
      credit
    }
  });

  if (errInsert) {
    res.json({
      data: '',
      status: 0,
      statusInfo: '数据库插入异常',
      ok: false
    })
  } else {
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
  }
});

module.exports = router;