const qiniu = require('qiniu');

const accessKey = '7mtg9snbUxRM6eiuWDqaLhDbROWpmeWLAaSRzHmJ';
const secretKey = 'NFV6JT3DpV0yJRIefAP1dELF9spUlEJ9CgyJX274';
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

const callback = function (req, res) {
  const {
    suffArr,
    shoppingId
  } = req.body;

  const tokenArr = [];
  const _shoppingId = shoppingId || 'a_sl204984_';
  const now = new Date();

  for (let item of suffArr) {
    const key = 'shopping/' + _shoppingId + item;
    const options = {
      scope: 'shoppingproject:' + key, // 上传空间
      deadline: now.getTime() / 1000 + 600, // 单位为秒
      // callbackUrl: 'http://47.99.72.101/qiniu/shopping/imgs/callback',
      // callbackBody: '{"key":"$(key)","hash":"$(etag)","shopId":"$(x:shopId)"}',
      returnBody: '{"key":"$(key)","hash":"$(etag)","shopId":"$(x:shopId)"}'
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