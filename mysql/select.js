const db = require('./db-conn');

const select = function ({
  tableName,
  clause,
  columns = []
} = {}) {
  let columnName;
  if (columns.length !== 0) {
    columnName = columns.join(',')
  } else {
    columnName = '*';
  }
  return new Promise(async (resolve) => {
    const {
      err,
      results,
      fields
    } = await db.query(`SELECT ${columnName} FROM ${tableName} WHERE ${clause}`);

    resolve({
      err,
      results,
      fields
    });
  });
}

const loSelect = function ({
  tableName,
  clause,
  columns = [],
  limit = 10,
  offset = 0
} = {}) {
  let columnName;
  if (columns.length !== 0) {
    columnName = columns.join(',')
  } else {
    columnName = '*';
  }

  return new Promise(async (resolve) => {
    const {
      err,
      results,
      fields
    } = await db.query(`SELECT ${columnName} FROM ${tableName} WHERE ${clause} LIMIT ${limit} OFFSET ${offset}`);

    resolve({
      err,
      results,
      fields
    });
  });

}

module.exports = {
  select,
  loSelect
};