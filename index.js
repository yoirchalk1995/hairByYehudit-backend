const express = require("express");
const helmet = require("helmet");

const app = express();

app.use(helmet());

app.listen(3000, () => {
  console.log("listening on port 3000");
});
