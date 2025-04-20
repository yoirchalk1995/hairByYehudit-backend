const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "config\\.env" });

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token)
    return res.status(401).send("user has not provided authentication token");
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (!payload.isAdmin)
      return res
        .status(403)
        .send("user is not authorized to carry out request");
    req.user = payload;
    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
};
