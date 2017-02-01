const serviceFactory = require('../service/service');
const serviceMiddlewareFactory = require('../service/middleware');
const validatorFactory = require('../validator/validator');
const validatorMiddlewareFactory = require('../validator/middleware');

const component = (db) => {
  const service = serviceFactory(db);
  const validator = validatorFactory();

  const serviceMiddleware = serviceMiddlewareFactory(service);
  const validatorMiddleware = validatorMiddlewareFactory(validator);

  const middleware = {
    service: serviceMiddleware,
    validator: validatorMiddleware,
  };

  return Object.assign(
    {},
    service,
    validator,
    { middleware },
    { db },
  );
};

module.exports = component;
