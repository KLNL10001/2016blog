var express = require('express');
//路由的实例
var router = express.Router();
var models = require('../models')

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
    res.render('user/reg', { title: '注册' });
})

router.post('/reg',function (req,res,next) {
    var user = req.body
    if (user.password != user.repassword)
    {
        res.redirect('back')
    }
    else
    {
        var user=req.body;
        //保存对象有两种方法  一个叫做model.create  entity.save
        //这相当于保存到了数据库中
        models.User.create(req.body,function (err,doc) {
            console.log(doc);
            //临时重定向 状态码为302  location
            res.redirect('/users/login')
        })
    }
})

//登录
router.get('/login',function (req,res,next) {
    res.render('user/login', { title: '登录' });
})

router.post('/login',function (req,res,next) {
    models.User.findOne({username:req.body.username,password:req.body.password},function (err,doc) {
        if (err)
        {
            res.redirect('back')
        }
        else
        {
            if (doc)//如果有值表示找到了对应额用户，表示登录成功
            {
                //如果登录成功后把查询到的user用户赋给session的user属性
                req.session.user=doc
                res.redirect('/')
            }
            else //找不到 登录失败
            {
                res.redirect('back')

            }
        }
    })
})
//登出
router.get('/logout',function (req,res,next) {
    req.session.user=null
    res.redirect('/');
})

module.exports = router;
