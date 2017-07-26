const responseObject = () => {
  let data = [];
  let errors = [];
  let success = true;

  const clear = () => {
    data = [];
    errors = [];
    success = true;
  };

  const addError = (newError) => {
    errors = [...errors, newError];
    success = false;
  };

  const addData = (newData) => {
    if (Array.isArray(newData)) {
      data = [...data, ...newData];
    } else {
      data = [...data, newData];
    }
  };

  const get = () => {
    if (data.length < 2) {
      data = data[0] || null;
    }

    if (!errors.length) {
      errors = null;
    }

    const response = {
      success,
      errors,
      data,
    };

    clear();

    return response;
  };

  return {
    addError,
    addData,
    clear,
    get,
  };
};

module.exports = responseObject;
