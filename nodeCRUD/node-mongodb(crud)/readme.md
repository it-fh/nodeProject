# 项目介绍

简单实现基于node +  mongodb + bootstrap 的前后端不分离项目，实现基本的用户crud。

# 基本接口

baseURL :localhost:3000

- get(地址栏访问)
  - / : 重定向到/list
  - /list : 展示全部用户列表信息页面
  - /add : 展示添加用户信息页面
  - /modify : 根据用户唯一id展示该用户信息页面
    - 参数：_id (用户唯一id)
  - /remove : 根据用户唯一id删除该用户信息
    - 参数：_id (用户唯一id)



- post(表单提交)
  - /add : 添加用户信息
  - /modify : 根据用户唯一id修改该用户信息
    - 参数 : _id (用户唯一id)



# 添加时用户字段限制

```js
{
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    age: {
        type: Number,
        min: 18,
        max: 80
    },
    password: String,
    email: String,
    hobbies: [String]
}
```





# 其他说明

public 文件夹是静态页面 直接通过模板字符串写入后台

user.json 数据文件可以使用mongoimport导入

附：

**使用mongoimport导入数据**

检查mongodb安装目录bin下是否有mongoimport.exe

没有则需要下载Tools工具压缩包

<https://www.mongodb.com/try/download/database-tools?tck=docs_databasetools> 

把压缩包内bin文件夹下所有的exe文件复制粘贴到你MongoDB安装目录bin文件夹下后配置环境变量

```js
mongoimport -d 数据库名称 -c 集合名称  --file 要导入的数据文件
//例如mongoimport -d playground -c users --file ./user.json
```

