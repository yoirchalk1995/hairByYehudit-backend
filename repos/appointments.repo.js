const db = require("../startup/db");

async function getAllAppointments() {
  const [appointments] = await db.query("SELECT * FROM appointments");
  return appointments;
}

async function getAppointmentsByColumn(column, value) {
  verifyColumn(mysqlColumn);

  const [appointments] = await db.query(
    `
    SELECT * FROM appointments
    WHERE
    ${column} = ?
    `,
    [value]
  );

  if (!appointments)
    throw {
      message: `no appointments with ${mysqlColumn} equal to ${value} was found`,
      status: 400,
    };

  return appointments;
}

const checkAppointment = async function (date, startTime, endTime) {
  const [rows] = await db.query(
    `
    SELECT * FROM appointment
    WHERE date = ?
    AND NOT(
    ? <= start_time OR
    ? >= end_time
    LIMIT 1
    )
    `,
    [date, endTime, startTime]
  );
  return rows;
};
/**
 *
 * @param {[Number, Number, String, String]} values  - Array of values to be inserted; userId, serviceId, date and startTime
 *
 */
const insertAppointment = async function (values) {
  const result = await db.query(
    `
    INSERT INTO appointments(
    \`user_id\`,
    \`service_id\`,
    \`date\`,
    \`start_time\`)
    VALUES (? ? ? ?)
    `,
    values
  );
};

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
module.exports.checkAppointment = checkAppointment;
module.exports.insertAppointment = insertAppointment;
