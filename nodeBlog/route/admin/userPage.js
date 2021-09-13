const {
    User
} = require('../../model/user');

module.exports = async (req, res) => {
// 标识当前访问的是用户管理页面
req.app.locals.currentLink = 'user';

    // 第几页
    let page = req.query.page || 1;
    // 每页显示的数据条数
    let pagesize = 1 ;
    // 查询用户数据的总数
    let count = await User.countDocuments();
    // 总页数
    let total = Math.ceil(count/pagesize);
    // 页码对应的数据查询开始位置
    let start = (page-1) * pagesize;

    let users = await User.find().limit(pagesize).skip(start);
    res.render('admin/user', {
        users,
        page,
        total
    }) 
}