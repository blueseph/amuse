const expect = require('chai').expect;
const sinon = require('sinon');

const Service = require('../../src/framework/component/service/service');

describe('service', () => {
  let service,
    model;
  let newingService,
    NewableModel,
    newedService;

  beforeEach(async () => {
    const fetch = sinon.spy();

    model = {
      fetchAll: sinon.spy(),
      fetch: sinon.spy(),
      where: sinon.stub().withArgs(1).returns({ fetch: sinon.spy() }),
      save: sinon.spy(),
      destroy: sinon.spy(),
    };

    service = Service(model);

    NewableModel = function () {
      return {
        fetchAll: sinon.spy(),
        fetch: sinon.spy(),
        where: sinon.stub().withArgs(1).returns({ fetch: sinon.spy() }),
        save: sinon.spy(),
        destroy: sinon.spy(),
      };
    };

    newedService = new NewableModel();

    newingService = Service(NewableModel);
  });

  describe('fetchAll', () => {
    it('should exist', () => {
      expect(service.fetchAll).to.be.function;
    });

    it('should call the spy\'s fetchall', async () => {
      await service.fetchAll();

      expect(model.fetchAll.called).to.be.true;
    });
  });

  describe('fetch', () => {
    it('should exist', () => {
      expect(service.fetch).to.be.function;
    });

    it('should call the spy\'s fetch', async () => {
      await service.fetch(1);

      expect(model.where.called).to.be.true;
      expect(model.where().fetch.called).to.be.true;
    });
  });

  describe('create', () => {
    it('should exist', () => {
      expect(service.create).to.be.function;
    });
  });
});
