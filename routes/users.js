const bcrypt = require("bcryptjs");
const express = require("express");
const Joi = require("joi");
const db = require("../startup/db");
const router = express.Router();
const PasswordComplexity = require("joi-password-complexity");
const sendEmail = require("../utils/sendMail");
const interNumber = require("../utils/interNumber");
const sendSms = require("../utils/sendSMS");

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let { email, userName, contactNumber, password, isAdmin, requestsVoice } =
    req.body;

  try {
    if (email) {
      email = normalizeEmail(email);
      const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [
        email,
      ]);
      if (rows.length)
        return res.status(400).send("email address already in use");
    }

    if (userName) {
      const [rows] = await db.query("SELECT * FROM users WHERE username = ?", [
        userName,
      ]);
      if (rows.length) return res.status(400).send("username already in use");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const [result] = await db.query(
      "INSERT INTO users (username, email, contact_number, hash, is_admin) VALUES (?, ?, ?, ?, ?)",
      [userName, email, contactNumber, hash, isAdmin]
    );
    if (email) {
      sendEmail(email, result.insertId);
    }

    if (contactNumber) {
      if (requestsVoice) {
        sendVoiceMessage(contactNumber);
        return;
      }
      const updatedNumber = interNumber(contactNumber);
      sendSms(updatedNumber);
    }

    res.send({
      userId: result.insertId,
      email,
      userName,
      contactNumber,
      isAdmin,
    });
  } catch (err) {
    res.status(500).send(`error connecting to db ${err}`);
  }
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

const normalizeEmail = function (email) {
  email = email.toLowerCase();

  let [localPart, domain] = email.split("@");

  if (domain === "gmail.com") {
    localPart = localPart.replace(/\./g, "");
    email = `${localPart}@${domain}`;
  }
  return email;
};

module.exports = router;
