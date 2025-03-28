const twilio = require("twilio");
const http = require("http");
const axios = require("axios");
const fs = require("fs");

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const accountSid = "AC486373f7b5bfc1189f172d3e7137558a";
const authToken = "0cf5bb83a135e0661234f9b29baca54c";

const customAgent = new http.Agent({
  ca: fs.readFileSync(
    "C:\\Users\\יהודית\\Documents\\2023 techloq bundle certificate.crt"
  ),
});

const customHttpClient = axios.create({ httpAgent: customAgent });

const client = twilio(accountSid, authToken);
client.httpClient = { request: customHttpClient.request };

const otp = Math.floor(100000000 * Math.random());

async function createSMS() {
  try {
    const message = await client.messages.create({
      body: `This is your OTP; ${otp}`,
      from: "+16193674484",
      to: "+972515847195",
    });
    console.log(message.body);
  } catch (err) {
    console.log(err);
  }
}

createSMS();
