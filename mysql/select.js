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

    console.log('select');

    console.log(
      err,
      results
    );
    console.log('~~~~~~~~~~~~~~~~');

    resolve({
      err,
      results,
      fields
    });
  });


}

const limitSelect = function ({
  tableName,
  clause,
  columns = [],
  limit = 10
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
    } = await db.query(`SELECT ${columnName} FROM ${tableName} WHERE ${clause} LIMIT ${limit}`);

    resolve({
      err,
      results,
      fields
    });
  });

}

module.exports = {
  select,
  limitSelect
};