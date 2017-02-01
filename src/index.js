const dbConn = require('./framework/db/db');
const component = require('./framework/component/component');
const koaHandler = require('./framework/koa/koa');

const mise = () => {
  const resources = {};

  const koa = koaHandler();
  const db = dbConn();

  const { connect } = db;

  const resource = (options = { tableName: 'default' }) => {
    resources[options.tableName] = Object.assign({},
      resources,
      component(db.resource(options))
    );
  };

  const listen = port => {
    koa.init(resources);
    koa.listen(3000);
  }

  return {
    resource,
    resources,
    connect,
    listen
  };
}

module.exports = mise;
