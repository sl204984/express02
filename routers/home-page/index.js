const express = require('express');
const router = express.Router();
const db = require('../../mysql');

router.post('/', async (req, res) => {
  const {
    pageSize,
    pageNum,
    type,
    detail = []
  } = req.body;
  if (!(detail instanceof Array) || detail.length === 0) {
    res.json({
      data: '', // 返回的数据
      status: 0, // 状态码
      statusInfo: '数据请求错误~',
      ok: false
    })
    return;
  }
  let clause = '';

  // 查询商品
  if (type === 0) { // 新鲜
    const clauseArr = [];
    for (let item of detail) {
      clauseArr.push(`index>"${item.start - 1}" AND type="${item.type}"`);
    }
    clause = clauseArr.join(' OR ');
  } else {
    for (let item of detail) {
      clauseArr.push(`index>"${item.start - 1}" AND type="${type}"`);
    }
    clause = clauseArr.join(' OR ');
  }
  console.log(req.body, clause)
  const {
    err: errSelect,
    results: resultsSelect
  } = await db.loSelect({
    tableName: 'shopping_info',
    clause: clause,
    limit: pageSize
  });
  if (errSelect) {
    console.log(errSelect);
    res.json({
      data: '', // 返回的数据
      status: 0, // 状态码
      statusInfo: '数据库查询错误~',
      ok: false
    });
    return;
  }
  // 如果没有查到任何数据，直接返回
  if (resultsSelect.length === 0) {
    res.json({
      data: {
        data: [],
        pageSize,
        pageNum: pageNum + 1,
        type,
        end: true
      }, // 返回的数据
      status: 0, // 状态码
      statusInfo: null,
      ok: true
    });
    return;
  }
  // 如果有数据
  const data = [];
  const imgs = ['pen.jpeg', 'lipstick.jpeg', 'fan.jpg', 'download.jpg', 'book.jpg'];
  const userInfoList = [];
  for (let item of resultsSelect) {
    // 获取图片信息
    const {
      err: imgErr,
      results: imgRes
    } = await db.select({
      tableName: 'shopping_imgs',
      columns: ['imgsrc'],
      clause: `shopping_id="${item.shopping_id}"`
    });
    if (imgErr) {
      res.json({
        data: '', // 返回的数据
        status: 0, // 状态码
        statusInfo: '数据库查询错误~',
        ok: false
      });
      return;
    }
    // 获取用户信息
    let userInfo = userInfoList.filter(
      userItem => item.user_id === userItem.user_id
    )[0];
    if (!userInfo) { // 不存在用户信息
      const {
        err,
        results
      } = await db.select({
        tableName: 'user_base_info',
        clause: `user_id="${item.user_id}"`
      });
      if (err) {
        res.json({
          data: '', // 返回的数据
          status: 0, // 状态码
          statusInfo: '数据库查询错误~',
          ok: false
        });
        return;
      }
      userInfo = results[0];
      userInfoList.push(userInfo);
    }

    data.push({
      publisher: userInfo.nickname,
      avatar: userInfo.avatar,
      shoppingName: item.shopping_name,
      imgList: imgRes.map(item => item.imgsrc),
      location: item.location,
      desc: item.description,
      price: item.price,
      shipFee: item.ship_fee,
      point: userInfo.credit,
      key: item.shopping_id
    });
  }

  const end = (data.length !== pageSize) || (pageNum > 9);
  res.json({
    data: {
      data,
      pageSize,
      pageNum: pageNum + 1,
      type,
      end
    }, // 返回的数据
    status: 0, // 状态码
    statusInfo: null,
    ok: true
  });

});

module.exports = router;