const db = require('./db-conn');

const update = function ({
  tableName,
  clause,
  data = {},
} = {}) {
  return new Promise(async (resolve) => {
    if (!data || Object.keys(data).length === 0) {
      resolve({
        err: '数据库修改错误~'
      });
      return;
    }
    let _fields = '';
    for (let key in data) {
      _fields += `${key}="${data[key]}",`;
    }
    _fields.substring(0, _fields.length - 1);

    const {
      err,
      results,
      fields
    } = await db.query(`UPDATE ${tableName} SET ${_fields} WHERE ${clause}`);
    resolve({
      err,
      results,
      fields
    });
  });
}

module.exports = {
  update
};