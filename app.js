var express = require('express');
//处理路径的 path.join p ath.resolve
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
//文章路由
var users = require('./routes/users');

var articles = require('./routes/articles');
//引入session中间件 req.session  req中多了session属性
var session    = require('express-session')
//这个是把session  放入到Mongo中
var MongoStore = require('connect-mongo')(session)
var config     = require('./config')
var flash = require('connect-flash')

//得到app
var app = express();
//不可以放在这里 因为是依赖于session  放在session之后
// app.use(flash())

//可设置是否为生产环境
// app.set('env',process.env)

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

console.log(process.env.NODE_ENV);
//处理content-type为json的请求体{"name":"value"}
app.use(bodyParser.json());
//处理content-type为urlencoded的请求体 extended为true表示使用querystring来将请求体的字符串转成对象 name=value1&&name=value2
app.use(bodyParser.urlencoded({ extended: false }));
//cookie处理中间件
//解析cookie req.cookie  req.cookie(key,value)
app.use(cookieParser());
//因为session依赖于cookie 所以需要写在cookie后面
//登录注册退出的时候会写一下session  一般都不写session
app.use(session({
    secret:'blog',//加密的字符串
    resave:true,//每次响应结束后都保存一下session数据
    saveUninitialized:true,//保存新创建但未初始化的session
    store:new MongoStore({//指定session的存放位置
        url:config.dbUrl
    })
}))
app.use(flash())
//res.locals  才是真正的渲染模板的对象
app.use(function (req,res,next) {
    res.locals.user    = req.session.user
    res.locals.success = req.flash('success').toString()
    res.locals.error   = req.flash('error').toString()
    next()
})
//处理静态文件服务中间件  指定一个绝对目录的路径作为静态文件的根目录
app.use(express.static(path.join(__dirname, 'public')));
//指定路由
 app.use('/', index);
// app.use('/', routes);
app.use('/users', users);
app.use('/articles', articles);
// catch 404 and forward to error handler
//捕获404错误，并转发到错误处理中间件
app.use(function(req, res, next) {
  var err = new Error('Not Found');
    res.status = 404;
  next(err);
});
//错误处理
//开发时的错误处理
// error handler
//将打印出错误的堆栈
console.log(app.get('env'))//development

//错误处理中间件有4个参数  第一个参数是错误对象
//如果有中间件出错了，会把请求转交给错误处理中间件来处理
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
    //生产环境下的错误处理 不向用户暴露堆栈信息
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
    //设置状态码 默认是500
  res.status(err.status || 500);
  //渲染模板
  res.render('error');
});
module.exports = app;