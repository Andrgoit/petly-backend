const Joi = require("joi");

const {
  emailRegExp,
  passwordRegExp,
  nameRegExp,
  locationRegExp,
  telRegExp,
} = require("../../service/validation/regExp");

const joiRegisterSchema = Joi.object({
  email: Joi.string().pattern(emailRegExp).required(),
  password: Joi.string().pattern(passwordRegExp).required(),
  name: Joi.string().pattern(nameRegExp).required(),
  location: Joi.string().pattern(locationRegExp).required(),
  phone: Joi.string().pattern(telRegExp).required(),
});

const joiLoginSchema = Joi.object({
  email: Joi.string().pattern(emailRegExp).required(),
  password: Joi.string().pattern(passwordRegExp).required(),
});

module.exports = {
  joiRegisterSchema,
  joiLoginSchema,
};
