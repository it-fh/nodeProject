const Joi = require('joi');
const {
  User,
  validateUser
} = require('../../model/user');
const bcrypt = require('bcryptjs');
module.exports = async (req, res,next) => {
  // 对客户端传递的字段进行验证，成功后添加到数据库中   

  try {
   await validateUser(req.body);
  } catch (e) {
    // return res.redirect(`/admin/user-edit?message=${e.message}`)
    // 改为使用错误处理中间件
return next(JSON.stringify({path:'/admin/user-edit',message:e.message}))
  }
  // 根据邮箱地址查询用户是否存在
  const user = await User.findOne({
    email: req.body.email
  });
  if (user) {
    // return res.redirect(`/admin/user-edit?message=邮箱地址被占用`);
    // 改为使用错误处理中间件
    return next(JSON.stringify({path:'/admin/user-edit',message:'邮箱地址被占用'}))
  }

  // 对密码进行加密
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);
  // 替换密码
  req.body.password = password;
  // 添加到数据库
  await User.create(req.body);
 return res.redirect('/admin/user');
}