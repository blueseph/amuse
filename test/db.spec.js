const chai = require('chai');

const expect = chai.expect;

const database = require('../src/framework/db/db');

describe('db', () => {
  let db;

  beforeEach(() => {
    db = database();
  });

  it('should have three public functions', () => {
    expect(db.connect).to.be.function;
    expect(db.resource).to.be.function;
    expect(db.getDb).to.be.function;

    expect(Object.keys(db).length).to.equal(3);
  });

  describe('getDB', () => {
    it('should be undefined if the db hasnt been connected to', () => {
      expect(db.getDb()).to.be.undefined;
    });

    it('should be defined if the db has been connected to', () => {
      db.connect({ client: 'mysql' });
      expect(db.getDb()).to.not.be.undefined;
    });
  });

  describe('resource', () => {
  });
});
