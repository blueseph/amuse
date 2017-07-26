/* default service without any additional configurations. can be overridden */

const service = (Model) => {
  const fetchAll = async () => Model.fetchAll();
  const fetch = async id => Model.where('id', id).fetch();

  const create = async (model) => {
    const created = { ...model, created: new Date() };
    return new Model(created).save();
  };

  const update = async (model) => {
    const updated = { ...model, updated: new Date() };
    return new Model(updated).save();
  };

  const remove = async (id) => {
    const toDelete = await new Model({ id }).fetch();

    if (toDelete) {
      return toDelete.destroy();
    }

    return null;
  };

  return {
    fetchAll,
    fetch,
    create,
    update,
    remove,
  };
};

module.exports = service;
