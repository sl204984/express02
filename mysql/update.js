const db = require('./db-conn');

const select = function ({
  tableName,
  clause,
  data = {},
} = {}, callback) {
  if (!data || Object.keys(data).length === 0) {
    typeof callback === "function" && callback('err');
    return;
  }
  let fields = '';
  for (let key in data) {
    fields += `${key}="${data[key]}",`;
  }
  fields.substring(0, fields.length - 1);
  db.query(`UPDATE ${tableName} SET ${fields} WHERE ${clause}`, (err, vals, fields) => {
    typeof callback === "function" && callback(err, vals, fields);
  });
}

module.exports = {
  select
};