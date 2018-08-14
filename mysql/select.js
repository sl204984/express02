const db = require('./db-conn');

const select = function ({
  tableName,
  clause,
  columns = []
} = {}, callback) {
  let columnName;
  if (columns.length === 0) {
    columnName = columns.join(',')
  } else {
    columnName = '*';
  }
  db.query(`SELECT ${columnName} FROM ${tableName} WHERE ${clause}`, (err, vals, fields) => {
    typeof callback === "function" && callback(err, vals, fields);
  });
}

const limitSelect = function ({
  tableName,
  clause,
  columns = [],
  limit = 10
} = {}, callback) {
  let columnName;
  if (columns.length === 0) {
    columnName = columns.join(',')
  } else {
    columnName = '*';
  }
  db.query(`SELECT ${columnName} FROM ${tableName} WHERE ${clause} LIMIT ${limit}`, (err, vals, fields) => {
    typeof callback === "function" && callback(err, vals, fields);
  });
}

module.exports = {
  select,
  limitSelect
};