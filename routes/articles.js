var express = require('express');
var router = express.Router();
var auth = require('../middleware/auth')

router.get('/post',auth.checkLogin, function(req, res, next) {
    res.render('index', { title: '发表文章' });
});

module.exports = router;
