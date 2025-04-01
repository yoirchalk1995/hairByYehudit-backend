const db = require("../startup/db");

const getUserByColumn = async function (mysqlColumn, value) {
  verifyColumn(mysqlColumn);
  const [user] = await db.query(
    `
    SELECT *
    FROM USERS
    WHERE ${mysqlColumn} = ?
    `,
    [value]
  );

  if (!user)
    throw {
      message: `no row with ${mysqlColumn} equal to ${value} was found`,
      status: 400,
    };

  return user;
};

/**
 * @param {string[]} columns - Array of column names
 * @param {any[]} values - Array of values corresponding to the columns
 */
const insertUser = async function (columns, values) {
  if (columns.length != values.length)
    throw { message: "not every entry has coresponding value", status: 400 };
  columns.forEach((arg) => {
    verifyColumn(arg);
  });

  const [result] = await db.query(
    `
    INSERT INTO users(
    ${columns.join(", ")}
    )
    VALUES(${Array(values.length).fill("?").join(", ")})`,
    values
  );

  return result;
};

const verifyColumn = function (columnName) {
  const columnNames = [
    "user_id",
    "username",
    "email",
    "contact_number",
    "is_admin",
    "is_verified",
    "hash",
  ];
  if (!columnNames.includes(columnName))
    throw { message: `invalid column name "${columnName}"`, status: 400 };
};

module.exports.insertUser = insertUser;
module.exports.getUserByColumn = getUserByColumn;
