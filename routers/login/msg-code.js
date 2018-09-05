const http = require('http');
const {
  encryption
} = require('../../utils');

const tplId = '96740'; // 短信模板id
const key = 'bf13ce6b31c8e1fb69a6986289bd1f83'; // 发送短信key

const sendMsg = function (req = {}, res) {
  const {
    mobile = ''
  } = req.body || {};
  if (!mobile || mobile.length !== 11) {
    res.json({
      data: '',
      status: 0,
      statusInfo: '请输入正确的手机号~',
      ok: false
    });
    return;
  }

  const code = Math.random().toString().slice(-6);
  const encryCode = encryption.Encode(code);
  //get 请求外网
  http.get(`http://v.juhe.cn/sms/send?mobile=${mobile}&tpl_id=${tplId}&tpl_value=%23code%23%3D${code}&dtype=&key=${key}`, function (req) {
    let resDataStr = '';
    req.on('data', function (data) {
      resDataStr += data;
    });
    req.on('end', function () {
      const resData = JSON.parse(resDataStr) || {}; // {"reason":"操作成功","result":{"sid":"201809051523189098552","fee":1,"count":1},"error_code":0}
      if (resData.error_code === 0) { // 发送成功
        res.json({
          data: {
            encryCode: encryCode
          },
          status: 0,
          statusInfo: '',
          ok: false
        });
      } else {
        res.json({
          data: '',
          status: 0,
          statusInfo: resData.reason + '~',
          ok: false
        });
      }
    });
  });
}

module.exports = sendMsg;