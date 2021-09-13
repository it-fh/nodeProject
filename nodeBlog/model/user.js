const mongoose = require('mongoose');
const Joi = require('joi');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    email: {
        type: String,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    // admin  & normal
    role: {
        type: String,
        required: true
    },
    state: {
        type: Number,
        //默认 0 为启用状态  1位禁用
        default: 0
    }
});
const User = mongoose.model('User', userSchema);
// 验证用户信息
const validateUser =user =>{
    const schema = Joi.object({
        username: Joi.string().min(2).max(12).required().error(new Error('用户名不符合验证规则')),
        email: Joi.string().email().required().error(new Error('邮箱格式不符合要求')),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error('密码验证错误')),
        role: Joi.string().valid('normal', 'admin').required().error(new Error('角色验证失败')),
        state: Joi.number().valid(0, 1).required().error(new Error('状态值非法'))
      });
     return schema.validateAsync(user);
}

module.exports = {
    User,
    validateUser
}