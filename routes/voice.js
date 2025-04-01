const { VoiceResponse } = require("twilio").twiml;

const app = require("../index");

app.get("/voice", (req, res) => {
  const otp = Math.floor(100000 + Math.random() * 900000);

  const response = new VoiceResponse();
  response.say(`Welcome to Hair By Yehudit. Youre one time passcode is ${otp}`);
  res.type("text/xml");
  res.send(response.toString());
});
