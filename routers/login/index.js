const express = require('express');
var md5 = require('md5-node');
const db = require('../../mysql');
const {
  Decode
} = require('../../utils/encode');
const router = express.Router();

router.post('/', async (req = {}, res) => {
  const {
    nickname,
    password,
    submitDate
  } = req.body || {};
  const _pwd = Decode(password);
  const {
    err: errSelect,
    results: resultsSelect
  } = await db.select({
    tableName: 'user_base_info',
    clause: `nickname="${nickname}" AND password="${_pwd}"`
  });
  if (errSelect || resultsSelect.length > 1) {
    res.json({
      data: '',
      status: 0,
      statusInfo: '数据库查询异常~',
      ok: false
    });
    return;
  }
  if (resultsSelect.length === 0) {
    res.json({
      data: '',
      status: 0,
      statusInfo: '用户名或密码错误~',
      ok: false
    });
    return;
  }
  const {
    avatar,
    mobile,
    user_id: userId,
    credit
  } = resultsSelect[0];
  const token = md5(submitDate, userId);
  const {
    err: errUpdate
  } = await db.update({
    tableName: 'user_base_info',
    clause: `user_id="${userId}"`,
    data: {
      token
    }
  });
  if (errUpdate) {
    res.json({
      data: '',
      status: 0,
      statusInfo: '数据库修改异常~',
      ok: false
    });
    return;
  }
  res.json({
    data: {
      nickname,
      password,
      submitDate,
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