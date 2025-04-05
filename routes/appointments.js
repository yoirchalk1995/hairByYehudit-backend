const router = require("express").Router();
const { getAllAppointments } = require("../repos/appointments.repo");

router.get("/", async (req, res) => {
  const appointments = await getAllAppointments();
  res.send(appointments);
});

module.exports = router;
