const qiniu = require('qiniu');
const {
  createId
} = require('../../utils');

const accessKey = '7mtg9snbUxRM6eiuWDqaLhDbROWpmeWLAaSRzHmJ';
const secretKey = 'NFV6JT3DpV0yJRIefAP1dELF9spUlEJ9CgyJX274';
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

const callback = function (req, res) {
  const {
    sourceKey
  } = req.body;

  if (!sourceKey) {
    return res.json({
      data: '', // 返回的数据
      status: 0, // 状态码
      statusInfo: '数据格式错误~',
      ok: false
    });
  }

  const now = new Date();
  const time = now.getTime();
  const key = 'avatar/' + sourceKey;
  const options = {
    scope: 'shoppingproject:' + key, // 上传空间
    deadline: time / 1000 + 600, // 单位为秒
    callbackUrl: 'http://47.99.72.101/qiniu/avatar/callback',
    callbackBody: `key=$(key)&hash=$(etag)&userId=$(x:userId)`
  };
  const putPolicy = new qiniu.rs.PutPolicy(options);
  const uploadToken = putPolicy.uploadToken(mac);

  res.json({
    data: {
      key,
      token: uploadToken
    }, // 返回的数据
    status: 0, // 状态码
    statusInfo: null,
    ok: true
  });
}

module.exports = callback;