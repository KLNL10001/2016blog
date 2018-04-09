
var mongoose = require('mongoose')
var config   = require('../config')
var type     = mongoose.Types.ObjectId


mongoose.connect(config.dbUrl)

exports.User=mongoose.model('user',new mongoose.Schema({
    username:String,
    password:String,
    email:String,
    avatar:String
}));
    //model：集合 可以操作这个集合    Schema ：骨架   Entity：实体  某个文档
    //user 是一个 model

exports.Article=mongoose.model('article',new mongoose.Schema({
    //是一个对象ID类型，引用用户模型
     user:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
    title:String,
    content:String,
    createAt:{type:Date,default:Date.now()},
}));