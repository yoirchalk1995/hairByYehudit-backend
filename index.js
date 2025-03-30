const express = require("express");
const helmet = require("helmet");
const users = require("./routes/users");
require("./startup/db");

const app = express();

app.use(helmet());
app.use(express.json());
app.use("/users", users);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

module.exports = app;
