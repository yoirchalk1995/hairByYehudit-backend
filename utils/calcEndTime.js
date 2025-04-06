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
  if (jsDate.getDate !== Number(day))
    throw Error("Appointment can not span two days");

  year = String(jsDate.getFullYear());
  month = String(jsDate.getMonth() + 1).padStart(2, "0");
  day = String(jsDate.getDate()).padStart(2, "0");
  hour = String(jsDate.getHours()).padStart(2, "0");
  minute = String(jsDate.getMinutes()).padStart(2, "0");

  const endTime = `${hour}:${minute}`;
  return { endTime };
}

module.exports = calcEndTime;
