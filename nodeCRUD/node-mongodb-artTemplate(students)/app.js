const http = require('http');
const path = require('path');
const template = require('art-template');
const getRouter = require('router');
const serveStatic = require('serve-static');
const dateformat = require('dateformat');
const qs = require('querystring');
const app = http.createServer();
const router = getRouter();
const serve = serveStatic(path.join(__dirname,'public'));
require('./model/connect');
const Student = require('./model/user');
template.defaults.root = path.join(__dirname,'views');
template.defaults.imports.dateformat = dateformat;
router.get('/',(req,res)=>{
    res.writeHead(301,{
        Location:'/index'
    });
    res.end();
})
router.get('/index',(req,res)=>{
    let html = template('./index.html',{});
    res.end(html);
})

router.get('/list',async (req,res)=>{
    let user = await Student.find();
    let html = template('./list.html',{user});
    res.end(html);
})
router.post('/add',(req,res)=>{
  let formData = '';
  req.on('data',param=>{
      formData+=param;
  });
  req.on('end',async _=>{
      await Student.create(qs.parse(formData));
      res.writeHead(301,{
          Location:'/list'
      });
      res.end();
  })
})

app.on('request',(req,res)=>{
    router(req,res,_=>{});
    serve(req,res,_=>{});
}).listen(3000,_=>{
    console.log('web服务器启动成功');
})