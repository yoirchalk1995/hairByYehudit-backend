const mysql = require("mysql2");

const db = mysql
  .createPool({
    host: "localhost",
    user: "root",
    password: "yoirchalk1995",
    database: "hair_by_yehudit",
  })
  .promise();

// Test the connection using a callback
db.getConnection()
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = db;
