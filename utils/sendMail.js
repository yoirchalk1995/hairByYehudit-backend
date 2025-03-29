const nodemailer = require("nodemailer");
const fs = require("fs").promises;

async function sendEmail(userEmail, userId) {
  const emailHtml = await fs.readFile(
    "templates\\emails\\signUp.html",
    "utf-8"
  );
  const updatedHtml = emailHtml.replace("{{userId}}", userId);

  let transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "yoirchalk1995@gmail.com",
      pass: "xeyt wxox tmno zwvu",
    },
  });

  let mailOptions = {
    from: "yoirchalk1995@gmail.com",
    to: userEmail,
    subject: "confirm your email adress",
    html: updatedHtml,
  };
  await transport.sendMail(mailOptions);
}

module.exports = sendEmail;
