const db = require("../startup/db");

const checkAvailability = async function (date, startTime, endTime) {
  const [rows] = await db.query(
    `
    SELECT is_available FROM availability 
    WHERE date = ?
    AND NOT(
    ? <= start_time OR
    ? >= end_time)
    LIMIT 1
    `,
    [date, endTime, startTime]
  );
  return rows;
};

/**
 *
 * @param {[String, String, String, Boolean]} values  - Array of values to be inserted; date, startTime, endTime and isAvailable
 *
 */
const insertAvailability = async function (values) {
  const result = await db.query(
    `
    INSERT INTO availability(
    date,
    start_time,
    end_time,
    is_available)
    VALUES (?, ?, ?, ?)
    `,
    values
  );
  return result;
};


module.exports.checkAvailability = checkAvailability;
module.exports.insertAvailability = insertAvailability;
