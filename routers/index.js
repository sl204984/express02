const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  console.log(req.body);
  console.log(req.cookies);
  res.json({
    name: '梁静茹'
  });
})

router.post('/', (req, res) => {
  console.log(req.body);
  console.log(req.cookies);
  res.json({
    name: '梁静茹'
  });
})

router.put('/', (req, res) => {
  res.json({
    name: '梁静茹'
  });
  console.log(req.body);
  console.log(req.cookies);
})

router.delete('/', (req, res) => {
  res.json({
    song: '勇气',
    singer: '梁静茹'
  });
  console.log(req.body);
  console.log(req.cookies);
})

module.exports = router;