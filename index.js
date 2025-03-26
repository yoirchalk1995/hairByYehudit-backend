const express = require("express");
const helmet = require("helmet");
const mysql = require("mysql2/promise");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "yoirchalk1995",
  database: "hair_by_yehudit",
});

db.getConnection()
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(`error conecting to db; ${err}`);
    process.exit(1);
  });

const app = express();

app.use(helmet());

app.listen(3000, () => {
  console.log("listening on port 3000");
});

module.exports = db;
