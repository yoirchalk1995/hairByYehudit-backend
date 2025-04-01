const express = require("express");
const helmet = require("helmet");

const services = require("./routes/services");
const users = require("./routes/users");
const verification = require("./routes/verification");

require("./startup/db");

const app = express();

app.use(helmet());
app.use(express.json());

app.use("/services", services);
app.use("/users", users);
app.use("/verification", verification);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

module.exports = app;
