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
    desc,
    location,
    university,
    shipFee
  } = req.body;

  const {
    err: errInsert
  } = await db.insert({
    tableName: 'shopping_imgs',
    data: {
      shopping_id: shoppingId,
      user_id: userId,
      shopping_name: shoppingName,
      price,
      type,
      count,
      store,
      desc,
      location,
      university,
      ship_fee: shipFee
    }
  });


  res.json({
    data: '',
    status: 0,
    statusInfo: '',
    ok: true
  });
}

module.exports = callback;