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
  var keyword = req.query.keyword; //先取出查询关键字
  var search = req.query.search//取出查询按钮
  var querObj = {}
  if (search)//如果search有值 那么强行覆盖session里面的值
  {
      var reg = new RegExp(keyword,'i')
      querObj = {$or:[{title:reg},{content:reg}]}
      req.session.keyword=keyword
  }
  else
  {
      keyword =  req.session.keyword;//如果search没有值 那么keyword从session里面取就可以了
  }

  if (keyword)
  {
      var reg = new RegExp(keyword,'i')
      querObj = {$or:[{title:reg},{content:reg}]}
      req.session.keyword=keyword
  }

  //user 字符串 对象 user.avatar
  //先查找 然后把user字符串转成user对象
    models.Article.find(querObj).populate('user').exec(function (err,articles) {
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
