/*  eslint no-param-reassign: ["error", { "props": false }]*/

const controller = (service) => {
  const fetchAll = async (ctx) => {
    ctx.body = await service.fetchAll();
  };

  const fetch = async (ctx) => {
    ctx.body = await service.fetch(ctx.params.id);
  };

  const create = async (ctx) => {
    const model = ctx.request.body;

    if (!model.id || model.id === 0) {
      ctx.body = await service.create(ctx.request.body);
    } else {
      ctx.response.status = 400;
      ctx.body = { error: 'Unable to create new resource with a valid ID' };
    }
  };

  const update = async (ctx) => {
    const model = ctx.request.body;

    if (model.id) {
      ctx.body = await service.update(ctx.request.body);
    } else {
      ctx.response.status = 400;
      ctx.body = { error: 'Unable to update resource without an ID' };
    }
  };

  const remove = async (ctx) => {
    try {
      ctx.response.status = 202;
      const res = await service.remove(ctx.params.id);
      if (res !== null) {
        ctx.body = res;
      } else {
        ctx.response.status = 404;
      }
    } catch (err) {
      ctx.response.status = 400;
    }
  };

  return {
    fetchAll,
    fetch,
    create,
    update,
    remove,
  };
};

module.exports = controller;
