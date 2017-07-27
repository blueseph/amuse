const serviceFactory = require('./service/service');
const serviceMiddlewareFactory = require('./service/middleware');
const validatorFactory = require('./validator/validator');
const validatorMiddlewareFactory = require('./validator/middleware');
const middlewareStore = require('../middlewares/middlewares');

const component = (db) => {
  const service = serviceFactory(db);
  const validator = validatorFactory();
  const middlewares = middlewareStore();
  const { add } = middlewares;

  const serviceMiddleware = serviceMiddlewareFactory(service);
  const validatorMiddleware = validatorMiddlewareFactory(validator);

  const middleware = {
    service: serviceMiddleware,
    validator: validatorMiddleware,
  };
  return {
    ...service,
    ...validator,
    middlewares: { add },
    middleware,
    db,
  };
};

module.exports = component;
