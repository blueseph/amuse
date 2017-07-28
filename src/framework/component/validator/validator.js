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
    let error = {};

    tests.forEach(({ property, test, customErr }) => {
      let failed = false;
      try {
        if (!test(obj)) {
          failed = true;
        }
      } catch (ex) {
        failed = true;
      }

      if (failed) {
        error = {
          ...error,
          [property]: [
            ...error[property] || [],
            customErr || `Object did not pass validation for property ${property}`,
          ],
        };
      }
    });

    if (Object.keys(error).length) {
      validationObject.addError(error);
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
