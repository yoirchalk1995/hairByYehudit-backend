const db = require("../startup/db");

const getServiceByColumn = async function (mysqlColumn, value) {
  verifyColumns(mysqlColumn);

  const [result] = await db.query(
    `
    SELECT * FROM services
    WHERE
    ${mysqlColumn} = ?
    `,
    [value]
  );

  if (!user)
    throw {
      message: `no service with ${mysqlColumn} equal to ${value} was found`,
      status: 400,
    };

  return result;
};

/**
 * @param {string[]} columns - Array of column names
 * @param {any[]} values - Array of values corresponding to the columns
 */
const insertService = async function (columns, values) {
  if (columns.length != values.length)
    throw { message: "not every entry has coresponding value", status: 400 };
  columns.forEach((arg) => {
    verifyColumn(arg);
  });

  const [service] = await db.query(
    `
      INSERT INTO services(
      ${columns.join(", ")}
      )
      VALUES(${Array(values.length).fill("?").join(", ")})`,
    values
  );

  return service;
};

const getAllServices = async function () {
  const [services] = await db.query("SELECT * FROM services");
  return services;
};

const verifyColumn = function (column) {
  const columns = ["service_id", "name", "length_in_min", "price", "in_person"];

  if (!columns.includes(column))
    throw { message: `invalid column name "${columnName}"`, status: 400 };
};

module.exports.getAllServices = getAllServices;
module.exports.getServiceByColumn = getServiceByColumn;
module.exports.insertService = insertService;
