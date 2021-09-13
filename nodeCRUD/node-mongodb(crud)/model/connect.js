const mongoose = require("mongoose");

mongoose.connect('mongodb://root:root@localhost:27017/playground?authSource=admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(_ => {
    console.log('数据库连接成功');
}).catch(_ => {
    console.log('数据库连接失败');
})