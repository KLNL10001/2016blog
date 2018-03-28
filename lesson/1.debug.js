/**
 * Created by zichunli on 18/3/27.
 */
//这是一个日志记录器，用于向控制台输出日志
//var debug = require('debug')('201602blog:server');
var debug = require('debug');
//错误  名字叫做201602blog:error
var error_debug = debug('201602blog:error')
error_debug('error')//DEBUG 会读DEBUG这个环境变量  看环境变量DEBUG这个环境变量的值 与  名字叫做201602blog:error是否一致
//当项目中出现警告的时候输出的日志
var warn_debug  = debug('201602blog:warn')
warn_debug('warn')
//调试日志  开发的时候需要看到的
var log_debug   = debug('201602blog:log')
log_debug('log')

//DEBUG=201602blog:* node 1.debug.js或者在webstorm中进行环境变量的设置，直接运行文件即可
// DEBUG=201602blog:* node 1.debug.js 需要同时执行才可以  分开则结果不正确







