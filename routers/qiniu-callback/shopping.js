const callback = async function (req, res) {
  const {
    key,
    shoppingId
  } = req.body;

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
  }
  res.json({
    data: '',
    status: 0,
    statusInfo: '',
    ok: true
  });
}

module.exports = callback;