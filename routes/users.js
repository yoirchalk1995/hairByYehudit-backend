const bcrypt = require("bcryptjs");
const express = require("express");
const Joi = require("joi");
const mysql = require("mysql2/promise");

const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const rows = await d;
  const salt = bcrypt.genSalt(10);
  res.send(users);
});

const complexityOptions = {
  min: 8, // Minimum length
  max: 30, // Maximum length
  lowerCase: 1, // At least one lowercase letter
  upperCase: 1, // At least one uppercase letter
  numeric: 1, // At least one number
  symbol: 1, // At least one special character
  requirementCount: 3,
};

const validateUser = function (user) {
  const userSchema = Joi.object({
    userName: Joi.string().required().min(5).max(20),
    email: Joi.string().email(),
    password: PasswordComplexity(complexityOptions).required(),
    isAdmin: Joi.boolean(),
  });

  return userSchema.validate(user);
};

const validateEmail = function (email) {
  email = email.toLowerCase();

  let [localPart, domain] = email.split("@");

  if (domain === "gmail.com") {
    localPart = localPart.replace(/\./g, "");
    email = `${localPart}@${domain}`;
  }
};

module.exports = router;
