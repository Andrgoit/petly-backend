const Joi = require("joi");

const {
  namePetRegExp,
  dataRegExp,
  breedRegExp,
  commentsRegExp,
} = require("../../service/validation/regExp");

const joiPetForms = Joi.object({
  name: Joi.string().pattern(namePetRegExp).required(),
  birthdate: Joi.string().pattern(dataRegExp),
  breed: Joi.string().pattern(breedRegExp),
  comments: Joi.string().pattern(commentsRegExp),
});

module.exports = {
  joiPetForms,
};