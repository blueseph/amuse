const Koa = require('koa');
const koarouter = require('koa-router');
const parser = require('koa-bodyparser');

const handler = () => {
  const app = new Koa();
  const router = koarouter();

  const setupResources = resources => {
    for (resource of Object.keys(resources)) {
      router.get(`/${resource}`, resources[resource].middleware.service.fetchAll);
      router.get(`/${resource}/:id`, resources[resource].middleware.service.fetch);
      router.post(`/${resource}`, resources[resource].middleware.validator, resources[resource].middleware.service.create);
      router.put(`/${resource}/:id`, resources[resource].middleware.validator, resources[resource].middleware.service.update);
      router.del(`/${resource}/:id`, resources[resource].middleware.service.remove);
    }
  };

  const useMiddlewares = () => {
    app.use(parser());
    app.use(router.routes());
    app.use(router.allowedMethods());
  };

  const init = resources => {
    setupResources(resources);
    useMiddlewares();
  };

  const listen = port => {
    app.listen(port);
  };

  return {
    init,
    listen,
  };
}

module.exports = handler;
