const db = require('../../mysql');

const callback = async function (req, res) {
  const {
    shoppingId,
    userId,
    shoppingName,
    price,
    type,
    count,
    store,
    description,
    location,
    university,
    shipFee
  } = req.body;
  const {
    err: errInsert
  } = await db.insert({
    tableName: 'shopping_info',
    data: {
      shopping_id: shoppingId,
      user_id: userId,
      shopping_name: shoppingName,
      price,
      type,
      count,
      store,
      description,
      location,
      university,
      ship_fee: shipFee || 0
    }
  });
  console.log(errInsert);

  if (errInsert) {
    res.json({
      data: '',
      status: 0,
      statusInfo: '数据库保存失败~',
      ok: false
    });
    return;
  }

  res.json({
    data: '',
    status: 0,
    statusInfo: '',
    ok: true
  });
}

module.exports = callback;