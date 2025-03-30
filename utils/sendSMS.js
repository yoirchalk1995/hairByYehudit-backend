const twilio = require("twilio");

const accountSid = "AC486373f7b5bfc1189f172d3e7137558a";
const authToken = "61a0a278e5bf6f6a0c2a7a82da94a94e";

const client = twilio(accountSid, authToken);

const otp = Math.floor(100000000 * Math.random());

async function sendSMS(intContactNumber) {
  try {
    const message = await client.messages.create({
      body: `This is your OTP; ${otp}`,
      from: "+16193674484",
      to: intContactNumber,
    });
    console.log(message.body);
  } catch (err) {
    console.log(err);
  }
}

module.exports = sendSMS;
