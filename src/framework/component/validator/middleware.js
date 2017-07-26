/*  eslint no-param-reassign: ["error", { "props": false }] */

const middleware = validator => async (ctx, next) => {
  const result = validator.validate(ctx.request.body);

  if (result.success) {
    await next();
  } else {
    ctx.response.status = 400;
    ctx.body = result;
  }
};

module.exports = middleware;
