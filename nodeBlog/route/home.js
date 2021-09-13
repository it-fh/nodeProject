const express = require('express');
// 创建博客前端展示页面路由
const home = express.Router();
// 渲染博客前台展示页面
home.get('/',require('./home/index'));
// 渲染前台文章详情展示页面
home.get('/article',require('./home/article'))
// 创建评论功能路由
home.post('/comment',require('./home/comment'))
home.get('/logout',require('./home/logout'))
module.exports = home;