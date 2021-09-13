const formidable = require('formidable');
const path = require('path');
const {Article} = require('../../model/article')
module.exports = (req, res) => {
    // 创建表单解析对象
    const form = new formidable.IncomingForm();
    // 配置客户端上传的文件存放位置
    form.uploadDir = path.join(__dirname, '../', '../', 'public', 'uploads');
    // 保留上传文件的后缀
    form.keepExtensions = true;
    // 解析表单
    form.parse(req, async(err, fields, files) => {
        // err 解析失败错误对象
        // fields 对象类型 普通的表单数据
        // files  对象类型 保存了和上传文件相关的数据
        console.log(fields.publishDate);
   await  Article.create({
       title:fields.title,
       author:fields.author,
       publishDate:fields.publishDate==''?new Date():fields.publishDate,
       cover:files.cover.path.split('public')[1],
       content:fields.content
     });
     res.redirect('/admin/article')
    })
}