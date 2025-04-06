const db = require("../startup/db");

const checkAvailability = async function (
  startDate,
  startTime,
  endDate,
  endTime
) {
  const avaidability = await db.query(
    `
    SELECT is_available FROM availability 
    WHERE date BETWEEN ? AND ?
    AND NOT(
    ? <= start_time OR
    ? >= end_time
    LIMIT 1
    )
    `[(startDate, endDate, endTime, startTime)]
  );
};

module.exports.checkAvailability = checkAvailability;
