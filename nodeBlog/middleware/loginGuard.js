const guard = (req,res,next)=>{
    //使用use中间件  req.url 这是当前路由(例如/admin）后面匹配的路径
    if(req.url!='/login' && !req.session.username){
        res.redirect('/admin/login');
    }else{
        if(req.session.role=='normal'){
            return res.redirect('/home/')
        }
        next(); 
    }
};

module.exports = guard;