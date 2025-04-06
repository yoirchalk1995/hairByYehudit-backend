const db = require("../startup/db");

const checkAvailability = async function (date, startTime, endTime) {
  const [rows] = await db.query(
    `
    SELECT is_available FROM availability 
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

module.exports.checkAvailability = checkAvailability;
