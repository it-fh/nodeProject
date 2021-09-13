const {Article} = require('../../model/article');
const pagination = require('mongoose-sex-page');
module.exports =async (req,res)=>{
const page = req.query.page;

    // 标识当前访问的文章管理页面
req.app.locals.currentLink = 'article';

let articles = await pagination(Article).page(page).size(2).display(3).populate('author').exec();
articles = JSON.parse(JSON.stringify(articles));
    res.render('admin/article',{
        articles
    })
}