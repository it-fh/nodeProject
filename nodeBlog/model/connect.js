const mongoose = require('mongoose');
const config = require('config');
mongoose.connect(`mongodb://${config.get('db.user')}:${config.get('db.pwd')}@${config.get('db.host')}:${config.get('db.port')}/${config.get('db.name')}`,{useNewUrlParser:true,useUnifiedTopology: true}).then(()=>console.log('数据库连接成功')).catch(err=>console.log(err,'数据库连接失败'))