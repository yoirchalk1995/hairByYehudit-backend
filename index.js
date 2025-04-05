const express = require("express");

const errorHandler = require("./middleware/errorHandler");
require("express-async-errors");
const helmet = require("helmet");
require("./utils/logger");
const notFound = require("./middleware/notFound");

const appointments = require("./routes/appointments");
const services = require("./routes/services");
const users = require("./routes/users");
const verification = require("./routes/verification");

require("./startup/db");

const app = express();

app.use(helmet());
app.use(express.json());

app.use("/appointments", appointments);
app.use("/services", services);
app.use("/users", users);
app.use("/verification", verification);
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

module.exports = app;
