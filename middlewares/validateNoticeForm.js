const { HttpError } = require("../helpers");

// импортируем схему  валидации
const {
  joiNoticeForms,
  joiNoticeFormsSell,
} = require("../schemas/joiSchemas/joiNoticeForms");

const validateNoticeForm = (req, res, next) => {
  const { category } = req.params;
  const noticeForm = req.body;
  if (category === "sell") {
    const { error } = joiNoticeFormsSell.validate(noticeForm);
    if (error) {
      throw HttpError(400, error.message);
    }
    next();
  }
  if (category === "lostfound" || category === "ingoodhands") {
    const { error } = joiNoticeForms.validate(noticeForm);
    if (error) {
      throw HttpError(400, error.message);
    }
    next();
  }
};

module.exports = validateNoticeForm;