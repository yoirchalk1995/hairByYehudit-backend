const Joi = require("joi");
const jwt = require("jsonwebtoken");

const db = import("../startup/db");
const router = require("express").Router();

router.post("/", async (req, res) => {
  const { error } = validateVerification(req.body);
  if (error) return res.status(400).send(err.details[0].message);
  const { userId, otp } = req.body;
  try {
    const [rows] = await db.query(
      "SELECT * FROM verification WHERE user_id = ?",
      [userId, otp]
    );
    console.log(rows);
  } catch (error) {
    console.log(error);
  }
});

const validateVerification = function (verification) {
  const schema = Joi.object({
    userId: Joi.number().positive().required(),
    otp: Joi.number().required().min(100000000),
  });

  return schema.validate(verification);
};

module.exports = router;
