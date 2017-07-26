const responseObject = require('../response');

const validation = () => {
  let tests = [];

  const validates = (property, test, customErr) => {
    const validatorObject = { property, test, customErr };
    tests = [...tests, validatorObject];

    return () => {
      tests = tests.filter(v => v !== validatorObject);
    };
  };

  const getValidators = () => tests;

  const validate = (obj) => {
    const validationObject = responseObject();
    let errors = {};

    tests.forEach(({ property, test, customErr }) => {
      if (!test(obj)) {
        errors = {
          ...errors,
          [property]: [
            ...errors[property] || [],
            customErr || `Object did not pass validation for property ${property}`,
          ],
        };
      }
    });

    if (Object.keys(errors).length) {
      validationObject.addError(errors);
    }

    return validationObject.get();
  };

  return {
    validates,
    validate,
    getValidators,
  };
};

module.exports = validation;
