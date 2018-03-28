var express = require('express');
//处理路径的 path.join path.resolve
//url querystring JSON .parse
var path = require('path');
//处理收藏夹图标
var favicon = require('serve-favicon');
//写日志的 日志中间件
var logger = require('morgan');
//解析cookie req.cookie属性存放着客户端提交过来的cookie
//req.cookie(key,value)向客户端写入cookie
var cookieParser = require('cookie-parser');
//处理请求体的 req.body属性 存放着请求体对象
var bodyParser = require('body-parser');
//主页路由
var index = require('./routes/index');
//用户路由
var users = require('./routes/users');
//得到app
var app = express();

// view engine setup
//设置模板的存放路径 默认路径是 当前目录下的views
app.set('views', path.join(__dirname, 'views'));
//设置模板引擎
// app.set('view engine', 'ejs');
app.set('view engine', 'html');
//指定 HTML模板的渲染方法
app.engine('html',require('ejs').__express)
// uncomment after placing your favicon in /public
//在你把favicon图标放置在public目录之后可取消注释
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//日志记录中间件
//:method :url :status :response-time ms - :res[content-length]
app.use(logger('dev'));
//处理content-type为json的请求体{"name":"value"}
app.use(bodyParser.json());
//处理content-type为urlencoded的请求体 extended为true表示使用querystring来将请求体的字符串转成对象 name=value1&&name=value2
app.use(bodyParser.urlencoded({ extended: false }));
//cookie处理中间件
//解析cookie req.cookie  req.cookie(key,value)
app.use(cookieParser());
//处理静态文件服务中间件  指定一个绝对目录的路径作为静态文件的根目录
app.use(express.static(path.join(__dirname, 'public')));
//指定路由
 app.use('/', index);
// app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
