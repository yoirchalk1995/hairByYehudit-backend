/**
 * @param {string} date - Date in format yyyy-dd-mm
 * @param {string} startTime - Time in format HH:MM
 * @param {number} lengthInMin
 * @returns Obejct containing endDate and endTime
 */
function calcEndTime(date, startTime, lengthInMin) {
  let [year, month, day] = date.split("-");
  let [hour, minute] = startTime.split(":");
  let jsDate = new Date(year, month - 1, day, hour, minute);
  jsDate.setMinutes(jsDate.getMinutes() + lengthInMin);
  year = String(jsDate.getFullYear());
  month = String(jsDate.getMonth() + 1).padStart(2, "0");
  day = String(jsDate.getDate()).padStart(2, "0");
  hour = String(jsDate.getHours()).padStart(2, "0");
  minute = String(jsDate.getMinutes()).padStart(2, "0");
  const endDate = `${year}-${month}-${day}`;
  const endTime = `${hour}:${minute}`;
  return { endDate, endTime };
}

module.exports = calcEndTime;
