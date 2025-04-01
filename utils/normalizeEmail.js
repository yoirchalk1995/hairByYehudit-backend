const normalizeEmail = function (email) {
  email = email.toLowerCase();

  let [localPart, domain] = email.split("@");

  if (domain === "gmail.com") {
    localPart = localPart.replace(/\./g, "");
    email = `${localPart}@${domain}`;
  }
  return email;
};

module.exports = normalizeEmail;
