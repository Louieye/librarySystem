/**
 * 封装操作数据库通用api
 */
//加载数据库驱动
var mysql = require('mysql');

exports.base = (sql,data,callback)=>{
    //创建数据库连接
    var connection = mysql.createConnection({
        host: 'localhost',  //数据库所在服务器的域名或IP地址
        user: 'root',   //登录数据库的账号
        password: 'root',   //登录数据库的密码
        database: 'book'   //访问的数据库（不是连接）
    });
    //执行连接操作
    connection.connect();
    //操作数据库(数据库操作是异步的)
    connection.query(sql,data, function (error, results, fields) {
        if (error) throw error;
        callback(results);
    
    });
  //关闭数据库
  connection.end();
}
