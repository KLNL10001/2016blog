var express = require('express');
var router  = express.Router();
var auth    = require('../middleware/auth')
var models  = require('../models')

router.get('/add',auth.checkLogin, function(req, res, next) {
    res.render('article/add', { title: '发表文章' });
});

router.post('/add',auth.checkLogin, function(req, res, next) {
    var article = req.body
    //把当前登录的用户的ID赋给user
    article.user = req.session.user._id
    models.Article.create(article,function (err,doc) {
        if (err)
        {
           req.flash('error','文章发表失败')
            res.render('article/add', { title: '发表文章' });
        }
        else
        {
            req.flash('success','文章发表成功！')
            res.redirect('/')
        }
    })
});
module.exports = router;
