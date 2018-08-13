const db = require('./db-conn');

const del = function ({
  tableName,
  clause
} = {}, callback) {

  db.query(`DELETE FROM ${tableName} WHERE ${clause}`, (err, vals, fields) => {
    typeof callback === "function" && callback(err, vals, fields);
  });
}

module.exports = {
  del
};