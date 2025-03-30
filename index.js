const express = require("express");
const helmet = require("helmet");
const users = require("./routes/users");
require("./startup/db");

const app = express();

app.use(helmet());
app.use(express.json());
app.use("/users", users);

app.listen(3000, () => {
  console.log("listening on port 3000");
});

module.exports = app;
