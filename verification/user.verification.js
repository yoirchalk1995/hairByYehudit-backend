const Joi = require("joi");
const PasswordComplexity = require("joi-password-complexity");

const complexityOptions = {
  min: 8, // Minimum length
  max: 30, // Maximum length
  lowerCase: 1, // At least one lowercase letter
  upperCase: 1, // At least one uppercase letter
  numeric: 1, // At least one number
  symbol: 1, // At least one special character
  requirementCount: 3,
};

module.exports = function validateUser(user) {
  const userSchema = Joi.object({
    userName: Joi.string().min(5).max(20),
    email: Joi.string().email(),
    password: PasswordComplexity(complexityOptions).required(),
    isAdmin: Joi.boolean(),
    contactNumber: Joi.string().pattern(/^\d{9,10}$/),
  })
    .or("email", "userName")
    .and("userName");

  return userSchema.validate(user);
};
