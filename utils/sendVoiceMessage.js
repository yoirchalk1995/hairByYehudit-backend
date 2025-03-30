const twilio = require("twilio");
require("dotenv").config({ path: "config\\.env" });

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

async function sendVoiceMessage(interNumber) {
  try {
    const call = await client.calls.create({
      url: "https://hairbyyehudit-backend.onrender.com/voice",
      to: interNumber,
      from: process.env.TWILIO_PHONE_NUMBER,
    });
  } catch (error) {
    console.log(error);
  }
}

sendVoiceMessage("+972515847195");
