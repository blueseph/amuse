const chai = require('chai');

const expect = chai.expect;

const Validator = require('../../src/framework/component/validator/validator');

describe('validator', () => {
  let validator;
  let validates;
  let validate;
  let getValidators;

  beforeEach(() => {
    // destructuring doesnt seem to work here.
    validator = Validator();

    validates = validator.validates;
    validate = validator.validate;
    getValidators = validator.getValidators;
  });

  it('should have three public functions', () => {
    expect(validate).to.be.function;
    expect(validates).to.be.function;
    expect(getValidators).to.be.function;

    expect(Object.keys(validator).length).to.equal(3);
  });

  describe('getValidators', () => {
    it('should get be empty if no validators were passed', () => {
      const validators = getValidators();

      expect(validators.length).to.equal(0);
    });

    it('should get be return all validators', () => {
      validates('a', obj => obj.a);
      validates('b', obj => obj.b);
      validates('c', obj => obj.c);

      const validators = getValidators();
      const aValidator = validators.find(({ property }) => property === 'a');
      const bValidator = validators.find(({ property }) => property === 'b');
      const cValidator = validators.find(({ test }) => `${test}` === `${obj => obj.c}`);

      expect(validators.length).to.equal(3);
      expect(aValidator).to.not.be.undefined;
      expect(bValidator).to.not.be.undefined;
      expect(cValidator).to.not.be.undefined;
    });
  });

  describe('validates', () => {
    it('should accept a property, a test, and a custom error', () => {
      const myTest = () => {};

      validates('prop', myTest, 'it broke');
      const validators = getValidators();
      const retrievedValidator = validators.find(({ test }) => test = myTest);

      expect(retrievedValidator).to.not.be.undefined;
    });

    it('should return an unsubscribe function', () => {
      const unsub = validates('prop', () => {}, 'custom error');

      expect(unsub).to.be.function;
      unsub();

      const validators = getValidators();
      expect(validators.length).to.equal(0);
    });
  });

  describe('validate', () => {
    let objectToValidate,
      validateFirst,
      validateSecond,
      validateThird,
      invalidValidate;

    beforeEach(() => {
      objectToValidate = { first: true, second: false, third: null };

      validateFirst = obj => obj.first;
      validateSecond = obj => !obj.second;
      validateThird = obj => obj.third === null;

      invalidValidate = obj => obj.fourth;
    });

    it('should validate the first', () => {
      validates('first', validateFirst);

      const result = validate(objectToValidate);

      expect(result.success).to.be.true;
    });

    it('should validate the second', () => {
      validates('second', validateSecond);

      const result = validate(objectToValidate);

      expect(result.success).to.be.true;
    });

    it('should validate the second', () => {
      validates('third', validateThird);

      const result = validate(objectToValidate);

      expect(result.success).to.be.true;
    });

    it('should fail to validate the fourth', () => {
      validates('fourth', invalidValidate);

      const result = validate(objectToValidate);

      expect(result.success).to.be.false;
      expect(result.errors.length).to.equal(1);
      expect(result.errors[0].fourth[0].includes('pass validation')).to.be.true;
    });
  });
});
