const { HttpError } = require("../helpers");
const { isValidObjectId } = require("mongoose");

const validateParamsID = (req, res, next) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        next(HttpError(400, "Incorrect id"));
    }

    next();
};

module.exports = {
  validateParamsID,
};