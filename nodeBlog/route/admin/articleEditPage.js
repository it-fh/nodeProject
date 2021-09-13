
module.exports = (req,res)=>{
        // 标识当前访问的文章管理页面
req.app.locals.currentLink = 'article';
    res.render('admin/article-edit')
}