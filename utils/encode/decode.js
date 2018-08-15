module.exports = function Decode(data) {
  const _flagLen = parseInt(data[0], 36);
  const _flag = data.substr(1, _flagLen);
  const _charCode = data.substring(_flagLen + 1, data.length);
  let _start = 0;
  let _pwd = '';
  for (let item of _flag) {
    const _len = parseInt(item, 36);
    const _charCodeItem = _charCode.substr(_start, _len);
    _pwd += _PartialDecode(_charCodeItem);
    _start += _len;
  }
  return _pwd;
}

function _PartialDecode(data) {
  // data前四位是标志位
  // 随机数是从第四位开始，长度随机
  // 标志位 + 随机数 + 长度字符串 + 加密后的密码
  const _RL = parseInt(data[0], 36); // 随机数长度
  const _LL = parseInt(data[1], 36); // 加密前的密码对应长度字符串
  const _PL = parseInt(data[2], 36); // 加密后的密码长度
  const _randomStartInd = 4;
  const _lenStartInd = _randomStartInd + _RL;
  const _charCodeStartInd = _lenStartInd + _LL;
  const _lenCharCode = '' + parseInt(data.substr(_lenStartInd, _LL), 36);
  const _charCode = '' + parseInt(data.substr(_charCodeStartInd, _PL), 36);

  let _start = 0; // 开始标志位
  let _pwd = ''; // 密码
  for (let item of _lenCharCode) {
    _pwd += String.fromCharCode(
      _charCode.substr(_start, parseInt(item))
    );
    _start += parseInt(item);
  }
  return _pwd;
}