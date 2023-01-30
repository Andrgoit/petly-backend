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

const joiNoticeForms = Joi.object({
  title: Joi.string().pattern(titleRegExp).required(),
  name: Joi.string().pattern(noticeNameRegExp),
  birthdate: Joi.string().pattern(dataRegExp),
  breed: Joi.string().pattern(noticeBreedRegExp),
  location: Joi.string().pattern(locationRegExp),
  price: Joi.number().pattern(noticePriceRegExp),
  comments: Joi.string().pattern(commentsRegExp).required(),
  sex: Joi.string()
    .valid(...sex)
    .required(),
});

const joiNoticeFormsSell = Joi.object({
  title: Joi.string().pattern(titleRegExp).required(),
  name: Joi.string().pattern(noticeNameRegExp),
  birthdate: Joi.string().pattern(dataRegExp),
  breed: Joi.string().pattern(noticeBreedRegExp),
  location: Joi.string().pattern(locationRegExp),
  price: Joi.number().pattern(noticePriceRegExp).required(),
  comments: Joi.string().pattern(commentsRegExp).required(),
  sex: Joi.string()
    .valid(...sex)
    .required(),
});


module.exports = {
  joiNoticeForms,
  joiNoticeFormsSell,
};