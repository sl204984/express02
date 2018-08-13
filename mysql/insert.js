const db = require('./db-conn');

const insert = function ({
  tableName,
  data
} = {}, callback) {
  if (!data || Object.keys(data).length === 0) {
    typeof callback === "function" && callback('err');
    return;
  }
  let fields = `(${Object.keys(data).join(',')})`;
  let values = `("${Object.values(data).join('","')}")`;

  db.query(`INSERT INTO ${tableName} (${fields}) VALUES (${values})`, (err, vals, fields) => {
    typeof callback === "function" && callback(err, vals, fields);
  });
}

const batchInsert = function ({
  tableName,
  data
} = {}, callback) {
  if (!data || data.length === 0 || Object.keys(data[0]).length === 0) {
    typeof callback === "function" && callback('err');
    return;
  }
  let fields = `(${Object.keys(data[0]).join(',')})`;
  let values = '';
  for (let item of data) {
    values += `("${Object.values(item).join('","')}"),`;
  }
  values = values.substring(0, values.length - 1);
  db.query(`INSERT INTO ${tableName} ${fields} VALUES ${values}`, (err, vals, fields) => {
    typeof callback === 'function' && callback(err, vals, fields);
  })
}

module.exports = {
  insert,
  batchInsert
};