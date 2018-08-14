const db = require('./db-conn');

const insert = function ({
  tableName,
  data
} = {}) {
  return new Promise(async (resolve) => {

    if (!data || Object.keys(data).length === 0) {
      resolve({
        err: '系统错误'
      });
      return;
    }

    let _fields = `(${Object.keys(data).join(',')})`;
    let _values = `("${Object.values(data).join('","')}")`;

    const {
      err,
      results,
      fields
    } = await db.query(`INSERT INTO ${tableName} ${_fields} VALUES ${_values}`);

    resolve({
      err,
      results,
      fields
    });

  });
}

const batchInsert = function ({
  tableName,
  data
} = {}) {

  return new Promise(async (resolve) => {
    if (!data || data.length === 0 || Object.keys(data[0]).length === 0) {
      resolve({
        err: '系统错误'
      });
      return;
    }

    let _fields = `(${Object.keys(data[0]).join(',')})`;
    let _values = '';
    for (let item of data) {
      _values += `("${Object.values(item).join('","')}"),`;
    }
    _values = _values.substring(0, _values.length - 1);

    const {
      err,
      results,
      fields
    } = await db.query(`INSERT INTO ${tableName} ${_fields} VALUES ${_values}`);

    resolve({
      err,
      results,
      fields
    });

  });
}

module.exports = {
  insert,
  batchInsert
};