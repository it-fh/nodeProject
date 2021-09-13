const express = require('express');

const admin = express.Router();
// 渲染登录页面
admin.get('/login',require('./admin/loginPage'));
// 实现登录功能
admin.post('/login',require('./admin/login'))
// 渲染用户列表页面
admin.get('/user',require('./admin/userPage'))
// 实现退出功能
admin.get('/logout',require('./admin/logout'))
// 渲染添加用户页面
admin.get('/user-edit',require('./admin/userEditPage'))
// 实现用户添加功能
admin.post('/user-edit',require('./admin/userEdit'))
// 实现修改用户功能
admin.post('/user-modify',require('./admin/user-modify'))
// 删除用户
admin.get('/delete',require('./admin/delete'))
// 渲染文章列表页面路由
admin.get('/article',require('./admin/articlePage'))
// 渲染文章编辑页面路由
admin.get('/article-edit',require('./admin/articleEditPage'))
//实现文章添加功能的路由
admin.post('/article-add',require('./admin/article-add'))
module.exports = admin;