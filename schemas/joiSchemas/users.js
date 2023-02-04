const Joi = require("joi");

const {
  emailRegExp,
  passwordRegExp,
  nameRegExp,
  locationRegExp,
  dataRegExp,
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
const birthdateError = new Error("Birthdate not valid. Date in the ISO format");

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
  name: Joi.string().pattern(nameRegExp).error(nameError),
  location: Joi.string().pattern(locationRegExp).error(locationError),
  phone: Joi.string().pattern(telRegExp).error(phoneError),
});

const joiUpdateUserSchema = Joi.object({
  email: Joi.string().pattern(emailRegExp).error(emailError),
  name: Joi.string().pattern(nameRegExp).error(nameError),
  birthdate: Joi.string().pattern(dataRegExp).error(birthdateError),
  phone: Joi.string().pattern(telRegExp).error(phoneError),
  location: Joi.string().pattern(locationRegExp).error(locationError),
});

module.exports = {
  joiRegisterSchema,
  joiLoginSchema,
  joiUpdateUserSchema,
};
