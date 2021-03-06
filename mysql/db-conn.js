const mysql = require('mysql');
const CONFIG = require('../config');

// 数据库连接
const pool = mysql.createPool({
  host: CONFIG.dbHost,
  user: 'root',
  password: 'Cetc28s-2b',
  database: 'shopping_project',
  connectionLimit: 10,
  port: 3306
});

function query(sql) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        resolve({
          err: '数据库连接异常'
        });
      } else {
        // Use the connection
        connection.query(sql, function (qerr, results, fields) {
          // 事件驱动回调
          resolve({
            err: qerr,
            results,
            fields
          });
          connection.release(); // 释放链接
        });
      }
    });
  });
}

exports.query = query;