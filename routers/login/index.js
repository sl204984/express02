const express = require('express');
// 数据库
// const db = require('../../mysql');

const router = express.Router();
// const tableName = 'user_info'; // 表的名称

router.get('/', (req, res) => {
  console.log(req.body);
  console.log(req.cookies);
  res.json({
    name: '梁静茹get'
  });
  // db.query(`SELECT * FROM ${tableName}`, (err, vals) => {
  //   console.log(err, vals);
  // });
});

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

module.exports = router;