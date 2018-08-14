const express = require('express');
var md5 = require('md5-node');


const {
  createId
} = require('../../utils');
// 数据库
// const db = require('../../mysql');

const router = express.Router();
// const tableName = 'user_info'; // 表的名称

// 增
router.post('/', (req, res) => {
  console.log(req.body);
  console.log(req.cookies);
  res.json({
    name: '梁静茹post'
  });
  // db.query(`INSERT INTO ${tableName} ()`);
});

// 改 INSERT INTO user_info (nickname,password,submission_date,tel) VALUES ("鑫鑫","123456","2018-06-14","17712345678");
router.put('/', (req, res) => {
  res.json({
    name: '梁静茹put'
  });
  console.log(req.body);
  console.log(req.cookies);
});

// 删
router.delete('/', (req, res) => {
  res.json({
    song: '勇气',
    singer: '梁静茹delete'
  });
  console.log(req.body);
  console.log(req.cookies);
});

router.get('/', (req = {}, res) => {
  // console.log('req', req);
  const {
    password,
    mobile,
    loginDate
  } = req;
  const idLen = 20;
  const timeStamp = (new Date()).getTime().toString(16);
  const randomId = createId(idLen - timeStamp.length); // 1是 splitIndex 的长度
  const id = randomId + timeStamp;
  const token = md5(loginDate, password, mobile, id);

  res.json({
    data: {
      id: randomId + timeStamp
    }, // 返回的数据
    status: 0, // 状态码
    statusInfo: '',
    ok: true
  })
});

module.exports = router;