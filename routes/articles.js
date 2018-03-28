var express = require('express');
var router = express.Router();

router.get('/post', function(req, res, next) {
    res.render('index', { title: '发表文章' });
});

module.exports = router;
