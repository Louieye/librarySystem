/**
 * 实现图书管理系统后台接口
 */

 const express = require('express');
 const router = require('./router.js');
 const bodyParser = require('body-parser');
 const app = express();

 app.use('/www',express.static('public'));
 //挂载参数处理中间件（post提交）
 app.use(bodyParser.urlencoded({ extended: false }));
 //处理json格式参数
 app.use(bodyParser.json());
 app.use(router);
 app.listen(3000,()=>{
     console.log('running...');
     
 });