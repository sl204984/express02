const multer = require('multer');
const CONFIG = require('../../config');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `./${CONFIG.static}/shopping`)
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
});

exports.upload = upload.array('files', 5);
exports.callback = function (req, res, next) {
  // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any
  // console.dir(req.files)
  res.json({
    status: 0,
    ok: true,
    message: '操作成功',
    data: {}
  });
};