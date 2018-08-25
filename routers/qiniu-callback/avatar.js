const db = require('../../mysql');

const callback = async function (req, res) {
  const {
    key,
    userId
  } = req.body;
  if (!key || !userId) {
    res.json({
      data: {
        key,
        userId
      },
      status: 0,
      statusInfo: '数据错误',
      ok: false
    });
    return;
  }
  const {
    err: errUpdate
  } = await db.update({
    tableName: 'user_base_info',
    clause: `user_id="${userId}"`,
    data: {
      avatar: key
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
    data: '', // 返回的数据
    status: 0, // 状态码
    statusInfo: '',
    ok: true
  });
}

module.exports = callback;