const db = require('./db-conn');

const insert = require('./insert');
const del = require('./delete');
const select = require('./select');
const update = require('./update');

const query = db.query;


module.exports = {
  query,
  insert,
  del,
  select,
  update
}