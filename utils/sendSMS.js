const twilio = require("twilio");
require("dotenv").config({ path: "config\\.env" });

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken);

async function sendSMS(intContactNumber) {
  let otp = Math.floor(1000000000 * Math.random());
  while (otp < 100000000) {
    otp = Math.floor(1000000000 * Math.random());
  }
  try {
    const body = `this is your otp ${otp}`;
    const message = await client.messages.create({
      body: body,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: intContactNumber,
    });
    return otp;
  } catch (err) {
    console.log(err);
  }
}

module.exports = sendSMS;
