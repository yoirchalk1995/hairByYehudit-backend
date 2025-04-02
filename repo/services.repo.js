const db = require("../startup/db");

const getByColumn = async function (mysqlColumn, value) {
  const [result] = await db.query(
    `
    SELECT * FROM services
    WHERE
    ${mysqlColumn} = ?
    `,
    [value]
  );

  return result;
};

const getAllServices = async function () {
  const [services] = await db.query("SELECT * FROM services");
  return services;
};

const verifyColumns = function (column) {
  const columns = ["service_id", "name", "length_in_min", "price", "in_person"];

  if (!columns.includes(column))
    throw { message: `invalid column name "${columnName}"`, status: 400 };
};

module.exports.getAllServices = getAllServices;
