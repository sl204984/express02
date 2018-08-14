const db = require('./db-conn');

const del = function ({
  tableName,
  clause
} = {}) {
  return new Promise(async (resolve) => {
    if (clause === null || clause.indexOf('=') === -1) {
      resolve({
        err: '数据库删除错误~'
      });
    }
    const {
      err,
      results,
      fields
    } = await db.query(`DELETE FROM ${tableName} WHERE ${clause}`);
    resolve({
      err,
      results,
      fields
    });
  })

}

module.exports = {
  del
};