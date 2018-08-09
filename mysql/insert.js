const db = require('./db-conn');
const utils = require('../utils');

const insert = ({
  tableName,
  data,
} = {}, callback) => {
  // ( field1, field2,...fieldN )
  // if (!utils.isArray(data)) return;
  let fields = '';
  let values = '';
  for (let key in data) {
    fields += `${key},`;
    values += `"${data[key]}",`;
  }
  fields = fields.substring(0, fields.length - 1);
  values = values.substring(0, values.length - 1);
  db.query(`INSERT INTO ${tableName} (${fields}) VALUES (${values})`, (err, vals, fields) => {
    typeof callback === "function" && callback(err, vals, fields);
  });
}

module.exports = insert;