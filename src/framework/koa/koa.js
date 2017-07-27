const Koa = require('koa');
const koarouter = require('koa-router');
const parser = require('koa-bodyparser');
const middlewareStore = require('../middlewares/middlewares');

const handler = () => {
  const app = new Koa();
  const router = koarouter();
  const middlewares = middlewareStore();
  const { add } = middlewares;

  const setupResources = (resources) => {
    const resourceMiddleware = middlewares.getMiddlewares();
    Object.entries(resources).forEach(([resource, component]) => {
      router.get(`/${resource}`, ...resourceMiddleware, component.middleware.service.fetchAll);
      router.get(`/${resource}/:id`, ...resourceMiddleware, component.middleware.service.fetch);
      router.post(`/${resource}`, ...resourceMiddleware, component.middleware.validator, component.middleware.service.create);
      router.put(`/${resource}/:id`, ...resourceMiddleware, component.middleware.validator, component.middleware.service.update);
      router.del(`/${resource}/:id`, ...resourceMiddleware, component.middleware.service.remove);
    });
  };

  const useMiddlewares = () => {
    app.use(parser());
    app.use(router.routes());
    app.use(router.allowedMethods());

    middlewares.getMiddlewares().forEach((middleware) => {
      app.use(middleware);
    });
  };

  const init = (resources) => {
    setupResources(resources);
    useMiddlewares();
  };

  const listen = (port) => {
    app.listen(port);
  };

  return {
    init,
    listen,
    middlewares: { add },
  };
};

module.exports = handler;
