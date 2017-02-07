const expect = require('chai').expect;
const sinon = require('sinon');

const Middlewares = require('../src/framework/middlewares/middlewares');

describe('middlewares', function() {
  let middlewares;
  let add;
  let getMiddlewares;

  beforeEach(() => {
    // destructuring doesnt seem to work here.
    middlewares = Middlewares();
    add = middlewares.add;
    getMiddlewares = middlewares.getMiddlewares;
  });

  it('should have two public functions', () => {
    expect(Object.keys(middlewares).length).to.equal(2);
  });

  describe('getMiddlewares', () => {
    it('should get all middlewares currently in the queue', () => {
      expect(getMiddlewares().length).to.equal(0);
    });
  });

  describe('add', () => {
    let fakeMiddleware;

    beforeEach(() => {
      fakeMiddleware = () => {};
    });

    it('should add a middleware', () => {
      add(fakeMiddleware);

      expect(getMiddlewares().length).to.equal(1);

      add(fakeMiddleware);

      expect(getMiddlewares().length).to.equal(2);
    });

    it('should return unsub functions', () => {
      const unsub = add(fakeMiddleware);

      expect(getMiddlewares().length).to.equal(1);

      unsub();

      expect(getMiddlewares().length).to.equal(0);
    });
  });
});
