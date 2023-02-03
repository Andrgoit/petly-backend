const { HttpError } = require("../helpers");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const object = req.body;
   
    const file = req.file;
    
    const objectLength = Object.keys(object).length;

    const { error } = schema.validate(req.body);

    if (objectLength === 0 && !file) {
      next(HttpError(400, "Req.body cannot be empty"));
    }

    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };

  return func;
};

module.exports = validateBody;
