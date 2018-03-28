var express = require('express');
//路由的实例
var router = express.Router();

//这里面可以挂use
// router.use(function (req,res) {
//   console.log('user use')
//     next()
// })

/* GET users listing. */
//这儿的path是  /users之后的路径  只要写后半段就可以了，不是path的全部内容
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

//注册
router.get('/reg',function (req,res,next) {
    res.render('index', { title: '注册' });

})
//登录
router.get('/login',function (req,res,next) {
    res.render('index', { title: '登录' });

})

//登出
router.get('/logout',function (req,res,next) {
    res.render('index', { title: '登出' });

})

module.exports = router;
