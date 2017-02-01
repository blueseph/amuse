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
    let validationObject = { success: true, errors: {} };

    tests.forEach(({ property, test, customErr }) => {
      if (!test(obj)) {
        validationObject = Object.assign({}, validationObject,
          {
            success: false,
            errors: Object.assign({}, validationObject.errors, {
              [property]: [...validationObject.errors[property] || [], customErr || `Object did not pass validation for property ${property}`],
            }),
          });
      }
    });

    return validationObject;
  };

  return {
    validates,
    validate,
    getValidators,
  };
};

module.exports = validation;
