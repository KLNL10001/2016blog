
var mongoose=require('mongoose')
var config = require('../config')
mongoose.connect(config.dbUrl)
exports.User=mongoose.model('user',new mongoose.Schema({
    username:String,
    password:String,
    email:String
}));
    //model：集合 可以操作这个集合    Schema ：骨架   Entity：实体  某个文档
    //user 是一个 model