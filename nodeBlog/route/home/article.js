const {Article} = require('../../model/article')
const {Comment} = require('../../model/comment')
module.exports = async(req,res)=>{
    const id = req.query.id;
let  article =  await    Article.findOne({_id:id}).populate('author');
let comments = await Comment.find({aid:id}).populate('uid');
article = JSON.parse(JSON.stringify(article));
comments = JSON.parse(JSON.stringify(comments))
    res.render('home/article',{
        article,
        comments
    })
}