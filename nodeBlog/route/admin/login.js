const {User} = require('../../model/user');
const bcrypt = require('bcryptjs');

module.exports = async (req,res)=>{
    // 服务器的二次验证
    const {email,password} = req.body;
    if(email.trim().length == 0 || password.trim().length == 0 )
    return res.status(400).render('admin/error',{
        msg:'邮件或者密码错误'
    });


    // 根据邮箱地址查询用户信息,没查询到为null
 let user = await  User.findOne({email});
 if(user){
     let isValid = await bcrypt.compare(password,user.password);
    if(isValid){
     req.session.username = user.username;
     req.session.role = user.role;
     req.app.locals.userInfo = user;
     if(user.role == 'admin'){
        res.redirect('/admin/user');
     }else{
         res.redirect('/home/')
     }
    }else{
        res.status(400).render('admin/error',{msg:'邮件或者密码错误'})
    } 
 }else{
     res.status(400).render('admin/error',{msg:'邮件或者密码错误'})
 }
}