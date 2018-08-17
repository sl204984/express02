const qiniu = require('qiniu');

const callback = function (req, res) {
  const {} = req.body;
  const accessKey = '7mtg9snbUxRM6eiuWDqaLhDbROWpmeWLAaSRzHmJ';
  const secretKey = 'NFV6JT3DpV0yJRIefAP1dELF9spUlEJ9CgyJX274';
  const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

  const now = new Date();
  const options = {
    scope: 'shoppingproject', // 上传空间
    deadline: now.getTime() / 1000 + 3600, // 单位为秒
    // callbackUrl: 'http://47.99.72.101/qiniu/shopping/imgs/callback',
    // callbackBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}'
    returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","shopId":"$(x:shopId)"}'
  };
  const putPolicy = new qiniu.rs.PutPolicy(options);
  const uploadToken = putPolicy.uploadToken(mac);
  res.json({
    data: {
      token: uploadToken
    }, // 返回的数据
    status: 0, // 状态码
    statusInfo: null,
    ok: true
  });
}

module.exports = callback;