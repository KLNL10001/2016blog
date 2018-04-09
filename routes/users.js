var express = require('express');
//路由的实例
var router = express.Router();
var models = require('../models')
var auth =   require('../middleware/auth')
var util =   require('util')

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
router.get('/reg',auth.checkNotLogin,function (req,res,next) {
    res.render('user/reg', { title: '注册' });
})
//
router.post('/reg',auth.checkNotLogin,function (req,res,next) {
    var user=req.body;
    if (user.password != user.repassword)
    {
        res.redirect('back')
    }
    else
    {
        //增加一个用户头像
        req.body.avatar= 'https://secure.gravatar.com/avatar/xxx2s-48'
        //保存对象有两种方法  一个叫做model.create  entity.save
        //这相当于保存到了数据库中
        models.User.create(req.body,function (err,doc) {
            if (err)
            {
                req.flash('error','用户注册失败！')
            }
            else
            {
                console.log('前台发送过来的用户数据',doc);
                req.flash('success','用户注册成功！')//大概等同于 req.session.success='用户注册成功！'
                //临时重定向 状态码为302  location
                res.redirect('/users/login')
            }
        })
    }
})

//登录
router.get('/login',auth.checkNotLogin,function (req,res,next) {
    res.render('user/login', { title: '登录' });
})

router.post('/login',auth.checkNotLogin,function (req,res,next) {
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
                req.flash('success','用户登录成功！')
                res.redirect('/')
            }
            else //找不到 登录失败
            {
                req.flash('error','用户登录失败！')
                res.redirect('back')
            }
        }
    })
})

//登出
router.get('/logout',auth.checkLogin,function (req,res,next) {
    req.session.user=null
    req.flash('success','用户退出成功！')
    res.redirect('/');
})

module.exports = router;
