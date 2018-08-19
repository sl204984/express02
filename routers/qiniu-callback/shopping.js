const db = require('../../mysql');

const callback = async function (req, res) {
  const {
    key,
    shoppingId
  } = req.body;
  console.log(req);
  if (!key || !shoppingId) {
    res.json({
      data: {
        key,
        shoppingId
      },
      status: 0,
      statusInfo: '数据错误',
      ok: false
    })
    return;
  }
  const {
    err: errSelect,
    results: resultsSelect
  } = await db.select({
    tableName: 'shopping_imgs',
    clause: `shopping_id="${shoppingId}" AND imgsrc="${key}"`
  });
  if (errSelect) {
    res.json({
      data: '',
      status: 0,
      statusInfo: '数据库查询异常~',
      ok: false
    });
    return;
  }
  if (resultsSelect.length === 0) {
    const {
      err: errInsert
    } = await db.insert({
      tableName: 'shopping_imgs',
      data: {
        shopping_id: shoppingId,
        imgsrc: key
      }
    });
    if (errInsert) {
      res.json({
        data: '',
        status: 0,
        statusInfo: '数据库插入异常~',
        ok: false
      })
    }
  }
  res.json({
    data: '',
    status: 0,
    statusInfo: '',
    ok: true
  });
}

module.exports = callback;