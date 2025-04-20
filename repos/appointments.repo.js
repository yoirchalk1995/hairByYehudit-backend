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
    SELECT a.appointment_status
    FROM appointments a
    JOIN services s 
    ON a.service_id = s.service_id
    WHERE a.date = ?
    AND a.start_time < ? 
    AND DATE_ADD(a.start_time, INTERVAL s.length_in_min MINUTE) > ?
    AND a.appointment_status = 'booked'
    LIMIT 1
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
    user_id,
    service_id,
    date,
    start_time)
    VALUES (?, ?, ?, ?)
    `,
    values
  );
  return result;
};

/**
 * @param {string[]} columns - Array of column names
 * @param {any[]} values - Array of values corresponding to the columns.
 */
const updateAppointment = async function (columns, values, id) {
  if (columns.length != values.length)
    throw { message: "not every entry has coresponding value", status: 400 };
  columns.forEach((arg) => {
    verifyColumn(arg);
  });

  values = values.concat(id);

  const setValue = columns.map((column) => `${column} = ?`).join(",");

  const [appointment] = await db.query(
    `
    UPDATE appointments
    SET ${setValue}
    WHERE appointment_id = ?
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
module.exports.updateAppointment = updateAppointment;
