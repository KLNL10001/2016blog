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

/**
 * 分页 传参当前页码 每页的条数
 * 结果返回当页的数据 一共多少页 当前页码 每页的条数
 */
router.get('/', function(req, res, next) {
  var user    = req.session.user
  var keyword = req.query.keyword; //先取出查询关键字
  var search  = req.query.search//取出查询按钮
  var pageNum = parseInt(req.query.pageNum)||1;//当前页码
  var pageSize = parseInt(req.query.pageSize)||2;//一页有多少条数据
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
    models.Article.find(querObj).skip((pageNum-1)*pageSize).limit(pageSize).populate('user').exec(function (err,articles) {

        articles.forEach(function (article) {
            article.content = mardown.toHTML(article.content)
        })
        //取得这个条件有多少条符合的数据
        models.Article.count(querObj,function (err,count) {
            res.render('index', {
                articles: articles,
                totalPage:Math.ceil(count/pageSize),
                keyword:keyword,
                pageNum:pageNum,
                pageSize:pageSize
            });

        })

    })
});

module.exports = router;
