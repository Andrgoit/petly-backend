const Joi = require("joi");

const {
  namePetRegExp,
  dataRegExp,
  breedRegExp,
  commentsRegExp,
} = require("../../service/validation/regExp");

const nameError = new Error("Name not valid. Any letters min:2 max 16");
const birthdateError = new Error("Birthdate not valid. Date in the ISO format");
const breedError = new Error("Breed not valid. Any letters min:2 max 16");
const commentsError = new Error(
  "Comments not valid. any letters and symbols. min 8, max 120"
);

// const birthdateError = new Error(
//   "Birthdate not valid. Date in the format dd.mm.yyyy"
// );

const joiPetForms = Joi.object({
  name: Joi.string().pattern(namePetRegExp).error(nameError).required(),
  birthdate: Joi.string().pattern(dataRegExp).error(birthdateError),
  breed: Joi.string().pattern(breedRegExp).error(breedError),
  comments: Joi.string().pattern(commentsRegExp).error(commentsError),
});

module.exports = {
  joiPetForms,
};
