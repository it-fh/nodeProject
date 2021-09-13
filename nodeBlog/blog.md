# 外链链接

- 外链链接需要写成例如/admin/ 的形式，才是相对于网站域名,经过静态资源处理后，就可以访问到，这是由浏览器解析的
- 而写成./的形式，相对的是当前路由访问的路径



# bcryptjs

一个加密模块，相比较bcrypt不需要依赖项，但会慢30%左右

```js
// 异步用法可以支持promise的形式
const bcrypt = require('bcryptjs');
async function run(){
    const salt = await bcrypt.genSalt(10);
    const result = await bcrypt.hash('123456',salt);
    const flag = await bcrypt.compare('123456',result);
    console.log(salt);
    console.log(result);
    console.log(flag);
}
run()
```



# cookie 与 session 

**cookie：**浏览器在电脑硬盘中开辟的一块空间，主要供服务器端存储数据。

- cookie中的数据是以域名的形式进行区分的
- cookie中的数据是有过期时间的，超过时间数据会被浏览器自动删除
- cookie中的数据会随着请求被自动发送到服务器端



**session：**实际上就是一个对象，存储在服务器端的内存中，在session对象中也可以存储多条数据，每一条数据都有一个sessionid作为唯一标识



然后服务器端会根据用户登录的信息是否正确返回sessionid存储在cookie中



## express中的使用

```
const session = require('express-session');
// 配置服务器端session
app.use(session({secret:'secret key'}));

```



## 登录拦截

```js
//登录拦截 判断用户登录状态
// 以/admin 开头就能进入到这里面
app.use('/admin',(req,res,next)=>{
    //使用use中间件(非传统的get)  req.url 这是当前路由(例如/admin）后面匹配的路径
    if(req.url!='/login' && !req.session.username){
        res.redirect('/admin/login');
    }else{
        next(); 
    }
})

// 中间件是按顺序的所以需要拦截路由需要写在上面

app.use('/home',home); 
app.use('/admin',admin);
```



# formidable

作用：解析表单，支持get请求参数，post请求参数，文件上传

```js
 // 创建表单解析对象
    const form = new formidable.IncomingForm();
    // 配置客户端上传的文件存放位置
    form.uploadDir = path.join(__dirname, '../', '../', 'public', 'uploads');
    // 保留上传文件的后缀
    form.keepExtensions = false;
    // 解析表单
    form.parse(req, (err, fields, files) => {
        // err 解析失败错误对象
        // fields 对象类型 普通的表单数据
        // files  对象类型 保存了和上传文件相关的数据
```





# 使用mongoose-sex-page 实现数据分页

```js
let articles = await pagination(Article).page(page).size(2).display(3).populate('author').exec();
```





# mongodb数据库添加账号

```js
mongo
show dbs
user admin
db.createUser({user:'root',pwd:'root',roles:['root']})
use blog
db.createUser({user:'blog',pwd:'blog',roles:['readWrite']})
exit
net stop mongodb
mongod --remove
mongod --logpath="D:\MongoDB\log\mongod.log" --dbpath="D:\MongoDB\data" --install --auth
net start mongodb
```



# 开发环境与生产环境

电脑环境变量配置 NODE_ENV:development

```js
if(process.env.NODE_ENV=='deveploment'){
    // 开发环境
}else{
    // 生产环境
}

```





# morgan

```js
if(process.env.NODE_ENV=='development'){
    // 开发环境
   app.use(morgan('dev'))
}else{
    // 生产环境
    console.log('pro');
} 
```



# config

允许开发人员将不同运行环境下的应用配置信息抽离到单独的文件中，模块内部会自动判断当前应用的运行环境，并读取对应的配置信息，极大提供应用配置信息的维护成本，避免了当运行环境重复的多次切换时，手动到项目代码中修改配置信息

- npm i config
- 在项目根目录下新建config文件夹
- config文件夹中新建default.json、development.json、production.json文件
- 使用模块内部提供的get方法获取配置信息

```js
const mongoose = require('mongoose');
const config = require('config');
mongoose.connect(`mongodb://${config.get('db.user')}:${config.get('db.pwd')}@${config.get('db.host')}:${config.get('db.port')}/${config.get('db.name')}`,{useNewUrlParser:true,useUnifiedTopology: true}).then(()=>console.log('数据库连接成功')).catch(err=>console.log(err,'数据库连接失败'))
```





有时候需要将项目分享，需要将一些敏感信息存储在环境变量中

- 在config文件夹中建立custom-environment-variables.json文件
- 配置项属性值填写系统环境变量的名字
- 项目运行时config模块查找系统环境变量，并读取其值作为当前配置项的值