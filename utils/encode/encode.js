const Random = require('./random');

module.exports = function Encode(data) {
  // 标志位长度 + 标志位 + 被加密的密码 + 时间
  const _len = 3; // 每 _len 位加一下密
  const _encodeTimes = ~~(data.length / _len);
  let _encodePwd = '';
  let _flag = '';
  for (let i = 0; i < _encodeTimes; i++) {
    const item = data.substr(i * _len, _len);
    const _encodeItem = _PartialEncode(item);
    _encodePwd += _encodeItem;
    _flag += _encodeItem.length.toString(36);
  }
  if (data.length % _len !== 0) {
    const end = data.substring(_encodeTimes * _len, data.length);
    const _encodeItem = _PartialEncode(end);
    _encodePwd += _encodeItem;
    _flag += _encodeItem.length.toString(36);
  }
  const _now = (new Date()).getTime().toString(36); // 时间

  const _flagLen = _flag.length.toString(36);

  return _flagLen + _flag + _encodePwd + _now;
}

function _PartialEncode(data) {
  // 需要加密的字符串的最大长度为三位
  let _charCode = '';
  let _charCodeLen = '';
  for (let i = 0; i < data.length; i++) {
    const _charCodeItem = data.charCodeAt(i) + '';
    _charCode += _charCodeItem;
    _charCodeLen += _charCodeItem.length;
  }
  _charCode = parseInt(_charCode);
  _charCodeLen = parseInt(_charCodeLen);
  _charCode = '' + _charCode.toString(36); // 加密后的密码
  _charCodeLen = '' + _charCodeLen.toString(36); // 长度字符串
  const _random = Random(); // 随机数
  const _flag = '' + _random.length.toString(36) +
    _charCodeLen.length.toString(36) +
    _charCode.length.toString(36) +
    (~~(Math.random() * 36)).toString(36); // 标志位
  return _flag + _random + _charCodeLen + _charCode;
}