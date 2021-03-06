const qiniu = require('qiniu');
const {
  createId
} = require('../../utils');

const accessKey = '7mtg9snbUxRM6eiuWDqaLhDbROWpmeWLAaSRzHmJ';
const secretKey = 'NFV6JT3DpV0yJRIefAP1dELF9spUlEJ9CgyJX274';
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

const callback = function (req, res) {
  const {
    suffArr,
    shoppingId
  } = req.body;

  if (!(suffArr instanceof Array)) {
    return res.json({
      data: '', // 返回的数据
      status: 0, // 状态码
      statusInfo: '数据格式错误~',
      ok: false
    });
  }

  const idLen = 20 - 2; // 2 是SN的长度
  const tokenArr = [];
  const now = new Date();
  const time = now.getTime();
  const timeStamp = time.toString(36);
  const _shoppingId = shoppingId ||
    ('SN' + createId(idLen - timeStamp.length) + timeStamp);

  for (let item of suffArr) {
    const key = 'shopping/' + _shoppingId + '_' + item;
    const options = {
      scope: 'shoppingproject:' + key, // 上传空间
      deadline: time / 1000 + 600, // 单位为秒
      callbackUrl: 'http://47.99.72.101/qiniu/shopping/callback',
      callbackBody: `key=$(key)&hash=$(etag)&shoppingId=$(x:shoppingId)`
    };
    const putPolicy = new qiniu.rs.PutPolicy(options);
    const uploadToken = putPolicy.uploadToken(mac);
    tokenArr.push({
      key,
      token: uploadToken
    });
  }
  res.json({
    data: {
      tokenArr,
      shoppingId: _shoppingId
    }, // 返回的数据
    status: 0, // 状态码
    statusInfo: null,
    ok: true
  });
}

module.exports = callback;