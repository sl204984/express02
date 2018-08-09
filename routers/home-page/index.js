const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const {
    pageSize,
    pageNum,
    type,
    detail
  } = req.body;
  const data = [];
  const imgs = ['pen.jpeg', 'lipstick.jpeg', 'fan.jpg', 'download.jpg', 'book.jpg'];
  for (let i = 0; i < pageSize; i++) {
    const imgCount = 5 + (Math.random() * 5 | 0);
    const imgList = [];
    for (let i = 0; i < imgCount; i++) {
      imgList.push('static/shopping/' + imgs[Math.random() * imgs.length | 0])
    }
    const dataItem = {
      publisher: 'sl204984',
      avatar: 'static/avatar/lovely.jpeg',
      shoppingName: '学习用品',
      imgList,
      location: '江苏南京',
      desc: '这是商品详情，需要在0到300字之间',
      price: 60,
      shipFee: 3,
      point: 100,
      key: 'key-' + Math.random()
    };
    data.push(dataItem);
  }
  res.json({
    data: {
      data,
      pageSize,
      pageNum: pageNum + 1,
      type,
      end: pageNum > 9
    }, // 返回的数据
    status: 0, // 状态码
    statusInfo: null,
    ok: true
  });
});

module.exports = router;