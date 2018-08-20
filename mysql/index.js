const db = require('./db-conn');

const {
  insert,
  batchInsert
} = require('./insert');
const {
  del
} = require('./delete');
const {
  select,
  loSelect
} = require('./select');
const {
  update
} = require('./update');

const query = db.query;


module.exports = {
  query,
  insert,
  batchInsert,
  del,
  select,
  loSelect,
  update
}