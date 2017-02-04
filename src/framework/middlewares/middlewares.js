const store = () => {
  let middlewares = [];

  const getMiddlewares = () => middlewares;

  const add = (middleware) => {
    middlewares = [...middlewares, middleware];

    return () => {
      middlewares = middlewares.filter(m => m !== middleware);
    };
  };

  return {
    getMiddlewares,
    add,
  };
};

module.exports = store;
