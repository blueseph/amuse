const responseObject = require('../response');

const controller = (service) => {
  const responseObj = responseObject();

  // finding no results is valid and is indicated by returning null in place of any data
  const fetchAll = async (ctx) => {
    let results = await service.fetchAll();
    results = results.length ? results : null;
    responseObj.addData(results);

    ctx.body = responseObj.get();
  };

  // finding no results for a single resource is a failure, however
  const fetch = async (ctx) => {
    const result = await service.fetch(ctx.params.id);

    if (result) {
      responseObj.addData(result);
      ctx.body = responseObj.get();
    } else {
      ctx.response.status = 404;
      ctx.body = '';
    }
  };

  const create = async (ctx) => {
    const model = ctx.request.body;

    if (!model.id || model.id === 0) {
      try {
        const result = await service.create(ctx.request.body);

        responseObj.addData(result);
      } catch (err) {
        responseObj.addError(err.toString());
      }

      ctx.body = responseObj.get();
    } else {
      ctx.response.status = 400;
      responseObj.addError('Unable to create a resource with an existing ID');

      ctx.body = responseObj.get();
    }
  };

  const update = async (ctx) => {
    const model = ctx.request.body;

    if (model.id) {
      try {
        const result = await service.update(ctx.request.body);

        responseObj.addData(result);
      } catch (err) {
        responseObj.addError(err.toString());
      }

      ctx.body = responseObj.get();
    } else {
      ctx.response.status = 400;
      responseObj.addError('Unable to update a resource with an ID');
      ctx.body = responseObj.get();
    }
  };

  const remove = async (ctx) => {
    try {
      const res = await service.remove(ctx.params.id);
      if (res !== null) {
        ctx.response.status = 202;
      } else {
        ctx.response.status = 404;
      }
    } catch (err) {
      ctx.response.status = 400;
      responseObj.addError(err.toString());
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
