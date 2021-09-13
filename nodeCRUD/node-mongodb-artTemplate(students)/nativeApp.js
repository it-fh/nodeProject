const http = require('http');
const template = require('art-template');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');
const dateformat = require('dateformat');
// 连接数据库
require('./model/connect');
const Student = require('./model/user');
const { serialize } = require('v8');
const app = http.createServer();
template.defaults.root = path.join(__dirname, 'views');
template.defaults.imports.dateformat = dateformat;
app.on('request', async (req, res) => {
    let method = req.method;
    let {
        pathname
    } = new URL(req.url, 'http://localhost:3000');
    if (method == 'GET') {
        if (pathname == '/index' || pathname == '/') {
            let html = template('./index.html', {});
            res.end(html);
        } else if (pathname == '/list') {
            let data = await Student.find();
            let html = template('./list.html',{
                user:data
            });
            res.end(html);
        } else {
            //  这里是处理模板文件的外链资源(实现静态资源)
            let staticUrl = path.join(__dirname, 'public', pathname);
            fs.readFile(staticUrl, (err, result) => {
                res.end(result);
            })
        }
    } else if (method == 'POST') {
        if (pathname == '/add') {
            let formData = "";
            req.on('data', param => {
                formData += param;
            });
            req.on('end', async _ => {
                await Student.create(querystring.parse(formData));
                res.writeHead(301, {
                    Location: '/list'
                });
                res.end();
            })
        }
    }
}).listen(3000, _ => {
    console.log('web服务器启动成功');
})