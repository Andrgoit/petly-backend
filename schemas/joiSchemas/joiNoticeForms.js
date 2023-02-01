const Joi = require("joi");

const {
  titleRegExp,
  noticeNameRegExp,
  dataRegExp,
  noticeBreedRegExp,
  locationRegExp,
  noticePriceRegExp,
  commentsRegExp,
} = require("../../service/validation/regExp");

const sex = ["male", "female"];

const titleError = new Error("Title not valid. Any letters min 2 max 48");
const nameError = new Error("Name not valid. Any letters min 2 max 16");
const birthdateError = new Error(
  "Birthdate not valid. Date in the format dd.mm.yyyy"
);
const breedError = new Error("Breed not valid. Any letters min 2 max 24");
const locationError = new Error(
  "Location not valid. String in City, Region format."
);
const commentsError = new Error(
  "Comments not valid. Any letters and symbols. min 8, max 120"
);
const sexError = new Error("Sex not valid. Male or female");
const priceError = new Error(
  "Price not valid. A number that must not start with 0"
);

const joiNoticeForms = Joi.object({
  category: Joi.string(),
  title: Joi.string().pattern(titleRegExp).error(titleError).required(),
  name: Joi.string().pattern(noticeNameRegExp).error(nameError),
  birthdate: Joi.string().pattern(dataRegExp).error(birthdateError),
  breed: Joi.string().pattern(noticeBreedRegExp).error(breedError),
  location: Joi.string().pattern(locationRegExp).error(locationError),
  // price: Joi.number().pattern(noticePriceRegExp),
  comments: Joi.string()
    .pattern(commentsRegExp)
    .error(commentsError)
    .required(),
  sex: Joi.string()
    .valid(...sex)
    .error(sexError)
    .required(),
});

const joiNoticeFormsSell = Joi.object({
  category: Joi.string(),
  title: Joi.string().pattern(titleRegExp).error(titleError).required(),
  name: Joi.string().pattern(noticeNameRegExp).error(nameError),
  birthdate: Joi.string().pattern(dataRegExp).error(birthdateError),
  breed: Joi.string().pattern(noticeBreedRegExp).error(breedError),
  location: Joi.string().pattern(locationRegExp).error(locationError),
  price: Joi.string().pattern(noticePriceRegExp).error(priceError).required(),
  comments: Joi.string()
    .pattern(commentsRegExp)
    .error(commentsError)
    .required(),
  sex: Joi.string()
    .valid(...sex)
    .error(sexError)
    .required(),
});

module.exports = {
  joiNoticeForms,
  joiNoticeFormsSell,
};
