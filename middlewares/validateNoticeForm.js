const { HttpError } = require("../helpers");

// импортируем схему  валидации
const {
  joiNoticeForms,
  joiNoticeFormsSell,
} = require("../schemas/joiSchemas/joiNoticeForms");

const validateNoticeForm = (req, res, next) => {
  try {
    // category или type???
    // const { category } = req.query;
    // const { category } = req.params;
    const noticeForm = req.body;
    console.log(noticeForm);
    const category = noticeForm.category;

    console.log(category);
    console.log(typeof category);
    if (category === "sell") {
      const { error } = joiNoticeFormsSell.validate(noticeForm);
      // console.log(987654);
      if (error) {
        throw HttpError(400, error.message);
      }
      return next();
    }
    if (category === "lostfound" || category === "ingoodhands") {
      const { error } = joiNoticeForms.validate(noticeForm);
      // console.log("12345");
      if (error) {
        throw HttpError(400, error.message);
        //  throw HttpError(400, "321");
      }
      return next();
    }
   
    throw HttpError(400, "Bad Request. Category is incorrect");

  } catch (error) {
    next(error);
  }
 
};

module.exports = validateNoticeForm;
