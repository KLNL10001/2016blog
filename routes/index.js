var express = require('express');
//调用Router方法生成一个路由的实例
var router = express.Router();

/*
* path 指定路径
* listener 指定回调监听函数
* GET home page.
*/

router.get('/', function(req, res, next) {
  var user = req.session.user
  res.render('index', { title: '首页'});
});

module.exports = router;
