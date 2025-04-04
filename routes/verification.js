require("dotenv").config();
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const db = require("../startup/db");
const router = require("express").Router();

router.get("/", async (req, res) => {
  const { userId } = req.query;
  try {
    let [user] = await db.query(
      `UPDATE users SET is_verified = 1 WHERE user_id = ?`,
      [userId]
    );
    if (!user) return res.status(404).send(`user with id ${userId} not found`);

    const authToken = validateUser(userId);

    res.setHeader("x-auth-token", authToken).send("sign up completed");
  } catch (error) {
    console.error(error);
  }
});

router.post("/", async (req, res) => {
  const { error } = validateVerification(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const { userId, otp } = req.body;
  try {
    const [verifications] = await db.query(
      "SELECT * FROM verifications WHERE user_id = ?",
      [userId]
    );
    if (!verifications)
      return res
        .status(404)
        .send("no verification data found for given userId");
    if (verifications[0].otp != otp)
      return res.status(401).send("incorrect otp provided");

    await db.query("UPDATE users SET is_verified = TRUE WHERE user_id = ?", [
      userId,
    ]);

    const authToken = validateUser(userId);

    res.setHeader("x-auth-token", authToken).send("sign up completed");
  } catch (error) {
    console.error(error);
  }
});

const validateVerification = function (verification) {
  const schema = Joi.object({
    userId: Joi.number().positive().required(),
    otp: Joi.number()
      .required()
      .min(100000000)
      .message("otp must be exactly 9 digits"),
  });

  return schema.validate(verification);
};

const validateUser = async function (userId) {
  const [user] = await db.query(
    "SELECT is_admin, email, username FROM users WHERE user_id = ?",
    [userId]
  );

  const { is_admin: isAdmin, email, username } = user[0];

  return (authToken = jwt.sign(
    {
      isAdmin: isAdmin,
      detail: email || username,
    },
    process.env.JWT_SECRET
  ));
};

module.exports = router;
