const twilio = require("twilio");
require("dotenv").config({ path: "config\\.env" });

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken);

const otp = Math.floor(100000000 * Math.random());

async function sendSMS(intContactNumber) {
  try {
    const message = await client.messages.create({
      body: `This is your OTP; ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: intContactNumber,
    });
    console.log(message.body);
  } catch (err) {
    console.log(err);
  }
}

module.exports = sendSMS;
