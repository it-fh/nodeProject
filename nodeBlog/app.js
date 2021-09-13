const express = require('express');
const path = require('path');
const session = require('express-session');
const template = require('art-template');
const dateFormat = require('dateformat'); 
// 在开发环境打印请求信息
const morgan = require('morgan');

const app = express();

// post参数处理
app.use(express.urlencoded({extended: false}));
app.use(express.json());
  
// 配置服务器端session
app.use(session({
    secret:'secret key', // 加密。随机输入标识即可
    resave:true, 
    saveUninitialized:false, 
    cookie:{
        maxAge:24*60*60*1000    //1天  设置cookie过期时间，否则浏览器关闭就销毁
    }
}));

//连接数据库
require('./model/connect');

// 配置静态资源(静态资源有外链需要写/相对于根)
app.use(express.static(path.join(__dirname,'public')));
//配置模板引擎 使用render 渲染
app.engine('html',require('express-art-template'));
app.set('views',path.join(__dirname,'views')); 
app.set('view engine','html');
template.defaults.imports.dateFormat = dateFormat;

// process.env.NODE_ENV 一般会配置在系统的环境变量中
// if(process.env.NODE_ENV=='development'){
//     // 开发环境
//    app.use(morgan('dev'))
// }else{
//     // 生产环境
//     console.log('pro');
// }

//创建二级路由
const home = require('./route/home');
const admin = require('./route/admin');

 
//登录拦截   以/admin 开头就能进入到这里面，需要拦截admin除登录页面其他页
app.use('/admin',require('./middleware/loginGuard'));


app.use('/home',home);  
app.use('/admin',admin); 


// 错误处理中间件需要传递4个参数
app.use((err,req,res,next)=>{
   const result = JSON.parse(err);
   let params = [];
   for(let attr in result){
       if(attr!= 'path'){
           params.push(attr+'='+result[attr]);
       } 
   }
   return res.redirect(`${result.path}?${params.join('&')}`);
})

app.listen(80);
console.log('网站服务器启动成功!');
