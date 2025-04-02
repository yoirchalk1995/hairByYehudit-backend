const bcrypt = require("bcryptjs");
const interNumber = require("../utils/interNumber");
const normalizeEmail = require("../utils/normalizeEmail");
const sendEmail = require("../utils/sendMail");
const sendSMS = require("../utils/sendSMS");
const validateUser = require("../validation/user.validation");
const { getUserByColumn, insertUser } = require("../repos/users.repo");

const db = require("../startup/db");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let { email, userName, contactNumber, password, isAdmin, requestsVoice } =
    req.body;

  try {
    if (email) {
      email = normalizeEmail(email);
      const user = await getUserByColumn("email", email);
      if (user.length)
        return res.status(400).send("email address already in use");
    }

    if (userName) {
      const usernameRows = await getUserByColumn("username", userName);
      const contactNumberRows = await getUserByColumn(
        "contact_number",
        contactNumber
      );
      if (usernameRows.length || contactNumberRows.length)
        return res
          .status(400)
          .send("username and contact number must be unique");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const result = await insertUser(
      ["username", "email", "contact_number", "hash", "is_admin"],
      [userName, email, contactNumber, hash, isAdmin]
    );

    let sentEmail = false;
    if (email) {
      sendEmail(email, result.insertId);
      sentEmail = true;
    }

    if (contactNumber && !sentEmail) {
      const updatedNumber = interNumber(contactNumber);

      if (requestsVoice) {
        sendVoiceMessage(updatedNumber);
        return;
      }

      const otp = await sendSMS(updatedNumber);

      await db.query("INSERT INTO verifications (user_id, otp) VALUES (?,?)", [
        result.insertId,
        otp,
      ]);
    }

    res.send({
      userId: result.insertId,
      email,
      userName,
      contactNumber,
      isAdmin,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

module.exports = router;
