const bcrypt = require('bcryptjs');
const {User} = require('../../model/user');
module.exports =async (req,res,next)=>{
const {username,email,role,state}=    req.body;
const id = req.query.id;
let user = await User.findOne({_id:id});
const isValid = await bcrypt.compare(req.body.password,user.password);
if(isValid){
   await User.updateOne({_id:id},{
       username:username,
       email:email,
       role:role,
       state:state
   });
   res.redirect('/admin/user');
}else{
    let obj = {path:'/admin/user-edit',message:'密码比对失败，不能进行用户信息的修改' ,id:id}
next(JSON.stringify(obj))
}
}