var express = require('express');
//调用Router方法生成一个路由的实例
var router = express.Router();
var models = require('../models')
var mardown = require('markdown').markdown

/*
* path 指定路径
* listener 指定回调监听函数
* GET home page.
*/

router.get('/', function(req, res, next) {
  var user = req.session.user
    //user 字符串 对象 user.avatar
    //先查找 然后把user字符串转成user对象
    models.Article.find({}).populate('user').exec(function (err,articles) {
        console.log(articles)
        if (err)
        {

        }
        else
        {
            articles.forEach(function (article) {
                article.content = mardown.toHTML(article.content)

            })
            res.render('index', { articles: articles});
        }
    })
});

module.exports = router;
