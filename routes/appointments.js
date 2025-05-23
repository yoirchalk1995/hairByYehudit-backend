const router = require("express").Router();

const {
  getAllAppointments,
  insertAppointment,
} = require("../repos/appointments.repo");

const { getUserByColumn } = require("../repos/users.repo");
const validateAppointment = require("../validation/appointment.validation");
const { getServiceColumn } = require("../repos/services.repo");
const calcEndTime = require("../utils/calcEndTime");
const { checkAvailability } = require("../repos/availability.repo");
const {
  checkAppointment,
  updateAppointment,
  getAppointmentsByColumn,
} = require("../repos/appointments.repo");

router.get("/", async (req, res) => {
  const appointments = await getAllAppointments();
  res.send(appointments);
});

router.post("/", async (req, res) => {
  const { error } = validateAppointment(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { userId, serviceId, date, startTime } = req.body;
  const [rows] = await getServiceColumn("length_in_min", serviceId);
  const lengthInMin = rows[0].length_in_min;

  await getUserByColumn("user_id", userId);

  const { endTime } = calcEndTime(date, startTime, lengthInMin);

  const availability = await checkAvailability(date, startTime, endTime);
  if (availability[0])
    return res
      .status(409)
      .send(`service not available on ${date} at ${startTime}`);

  const existingAppointment = await checkAppointment(date, startTime, endTime);
  if (existingAppointment[0]) {
    res
      .status(409)
      .send(
        `unable to book appointment on ${date} starting at ${startTime} due to existing appointment`
      );
  }

  const appointment = await insertAppointment([
    userId,
    serviceId,
    date,
    startTime,
  ]);

  const result = {
    appointmentId: appointment[0].insertId,
    userId,
    serviceId,
    date,
    startTime,
  };

  res.send(result);
});

router.patch("/:id", async (req, res) => {
  const appointmentId = req.params.id;

  let appointment = await getAppointmentsByColumn(
    "appointment_id",
    appointmentId
  );
  if (appointment[0].appointment_status != "booked")
    return res
      .status(409)
      .send(`appointment has already been met or cancelled`);

  await updateAppointment(["appointment_status"], ["canceled"], appointmentId);

  appointment = await getAppointmentsByColumn("appointment_id", appointmentId);

  res.send(appointment[0]);
});

module.exports = router;
