//引入数据库
const mysql=require('mysql');

//实现本地链接
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'react_demo',
    multipleStatements: true
}) 

module.exports = connection;