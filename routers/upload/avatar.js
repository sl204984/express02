const multer = require('multer');
const CONFIG = require('../../config');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `./${CONFIG.static}/avatar`)
  },
  filename: function (req, file, cb) {
    // file.mimetypes  图片格式：image/jpeg | image/png
    // cb(null, false)
    cb(null, file.originalname)
    // cb(null, file.fieldname + '-' + Date.now())
  }
})

const upload = multer({
  storage: storage
})

exports.upload = upload.single('avatar');
exports.callback = function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  res.json({
    status: 0,
    ok: true,
    message: '操作成功',
    data: {}
  });
};