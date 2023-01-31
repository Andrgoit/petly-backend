const Joi = require("joi");

const {
  emailRegExp,
  passwordRegExp,
  nameRegExp,
  locationRegExp,
  telRegExp,
} = require("../../service/validation/regExp");

const emailError = new Error("Email not valid");
const passwordError = new Error(
  "Password not valid. Any letters and symbols except spaces. min 7 characters max 32"
);
const nameError = new Error("Name not valid. Any letters");
const locationError = new Error(
  "Location not valid. String in City, Region format."
);
const phoneError = new Error(
  "Phone not valid. String in format  +380671234567"
);

const joiRegisterSchema = Joi.object({
  email: Joi.string().pattern(emailRegExp).error(emailError).required(),
  password: Joi.string()
    .pattern(passwordRegExp)
    .error(passwordError)
    .required(),
  name: Joi.string().pattern(nameRegExp).error(nameError).required(),
  location: Joi.string()
    .pattern(locationRegExp)
    .error(locationError)
    .required(),
  phone: Joi.string().pattern(telRegExp).error(phoneError).required(),
});

const joiLoginSchema = Joi.object({
  email: Joi.string().pattern(emailRegExp).error(emailError).required(),
  password: Joi.string()
    .pattern(passwordRegExp)
    .error(passwordError)
    .required(),
});

module.exports = {
  joiRegisterSchema,
  joiLoginSchema,
};