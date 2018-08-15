module.exports = function Random() {
  // 随机产生0到5位之间的随机数
  let _len = ~~(Math.random() * 5) + 1;
  let _rand = ~~(Math.random() * (36 ** _len));
  return _rand.toString(36);
}