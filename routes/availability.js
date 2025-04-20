const { insertAvailability } = require("../repos/availability.repo");
const validateAvailability = require("../validation/availability.validation");
const auth = require("../middleware/auth");

const router = require("express").Router();

router.post("/", auth, async (req, res) => {
  const { error } = validateAvailability(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { date, startTime, endTime, isAvailable } = req.body;

  const availablity = await insertAvailability([
    date,
    startTime,
    endTime,
    isAvailable,
  ]);

  res.send({
    availablityId: availablity[0].insertId,
    startTime,
    endTime,
    isAvailable,
  });
});

router.get("/", async (req, res) => {
  const { startDate, startTime, endDate, endTime } = req.query;
});

module.exports = router;
