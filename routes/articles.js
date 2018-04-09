var express = require('express');
var router  = express.Router();
var auth    = require('../middleware/auth')
var models  = require('../models')

var multer  = require('multer')
//指定存储的目录和文件名
var storage = multer.diskStorage({
    //目标路径
    destination: function (req, file, cb) {
        cb(null, '../public/uploads')
    },
    //文件名
    filename: function (req, file, cb) {
        //filename originalname mimetype
        console.log(file)
        cb(null, Date.now()+'.'+file.mimetype.slice(file.mimetype.indexOf('/')+1))
    }
})

var upload = multer({ storage: storage })

router.get('/add',auth.checkLogin, function(req, res, next) {
    res.render('article/add', { title: '发表文章' });
});

router.post('/add',auth.checkLogin,upload.single('poster'), function(req, res, next) {
    var article = req.body
    if(req.file)
    {
        //  /uploads/1523282580678.png
        article.poster='/uploads/'+req.file.filename
    }
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
