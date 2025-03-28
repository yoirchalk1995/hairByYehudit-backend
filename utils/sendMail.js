const nodemailer = require("nodemailer");

async function sendEmail(userEmail, userId) {
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
    html: `
    <p> click link below to confirm email adress </p>
    <a href="http://localhost:3000/confirm?userid='${userId}'">
    confirm email </a>
    `,
  };
  await transport.sendMail(mailOptions, (err) => console.log(err));
}

module.exports = sendEmail;
