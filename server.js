const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// 配置
const CONFIG = require('./config');
// 数据库
// const db = require('./mysql');
// 各个路由
const indexRouter = require('./routers');
const usersRouter = require('./routers/users');
const registerRouter = require('./routers/register');
const loginRouter = require('./routers/login');
const forgetPwdRouter = require('./routers/forget-pwd');
const uploadRouter = require('./routers/upload');
const homeRouter = require('./routers/home-page');
const searchRouter = require('./routers/search');
const userCenterRouter = require('./routers/user-center');
// 七牛回调
const qiniuRouter = require('./routers/qiniu-callback');
// 支持跨域配置
const allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'x-custom');
  res.header('Access-Control-Allow-Credentials', 'true'); // 和客户端对应，必须设置以后，才能接收cookie.
  next();
};

app.use(allowCrossDomain); // 可以跨域
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/forgetPwd', forgetPwdRouter);
app.use('/upload', uploadRouter);
app.use('/home', homeRouter);
app.use('/search', searchRouter);
app.use('/userCenter', userCenterRouter);
// 七牛回调
app.use('/qiniu', qiniuRouter);

// 静态文件
app.use("/static/avatar", express.static(__dirname + `/${CONFIG.static}/avatar`));
app.use("/static/icons", express.static(__dirname + `/${CONFIG.static}/icons`));
app.use("/static/shopping", express.static(__dirname + `/${CONFIG.static}/shopping`));

app.listen(CONFIG.port);
console.log('listening to port ' + CONFIG.port);