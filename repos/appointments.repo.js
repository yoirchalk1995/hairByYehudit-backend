const db = require("../startup/db");

async function getAllAppointments() {
  const [appointments] = await db.query("SELECT * FROM appointments");
  return appointments;
}

const verifyColumn = function (column) {
  const columns = [
    "appointment_id",
    "service_id",
    "user_id",
    "start_time",
    "appointment_status",
  ];

  if (!columns(column))
    throw { message: `invalid column name; ${column}.`, status: 400 };
};

module.exports.getAllAppointments = getAllAppointments;
