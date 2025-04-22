const { insertAvailability } = require("../repos/availability.repo");
const validateAvailability = require("../validation/availability.validation");
const auth = require("../middleware/auth");

const router = require("express").Router();

router.post("/", auth, async (req, res) => {
  const { error } = validateAvailability(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { date, startTime, endTime, isAvailable } = req.body;

  const availability = await insertAvailability([
    date,
    startTime,
    endTime,
    isAvailable,
  ]);

  res.send({
    availabilityId: availability[0].insertId,
    startTime,
    endTime,
    isAvailable,
  });
});

module.exports = router;
