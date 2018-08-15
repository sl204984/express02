const express = require('express');
const db = require('../../mysql');
const {
  Decode
} = require('../../utils/encode');
const router = express.Router();

router.post('/', async (req = {}, res) => {
  const {
    mobile,
    password
  } = req.body || {};
  const {
    err: errSelect,
    results: resultsSelect
  } = await db.select({
    tableName: 'user_base_info',
    clause: `mobile="${mobile}"`
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
      statusInfo: '该号码尚未注册~',
      ok: false
    });
    return;
  }
  const {
    nickname,
    user_id: userId
  } = resultsSelect[0];
  const {
    err: errUpdate
  } = await db.update({
    tableName: 'user_base_info',
    clause: `user_id="${userId}"`,
    data: {
      password: Decode(password)
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
      password
    }, // 返回的数据
    status: 0, // 状态码
    statusInfo: '',
    ok: true
  });
});

module.exports = router;