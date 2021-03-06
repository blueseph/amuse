const Knex = require('knex');
const Bookshelf = require('bookshelf');

const dbHandler = () => {
  let db;

  const connect = (options) => {
    db = Bookshelf(Knex(options));
  };

  const resource = options => db.Model.extend(options);

  const getDb = () => db;

  return {
    connect,
    resource,
    getDb,
  };
};

module.exports = dbHandler;
