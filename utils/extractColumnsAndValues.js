const extractColumnsAndValues = function (reqBody) {
  const values = Object.values(reqBody);
  const bodyFields = Object.keys(reqBody);
  const sqlColumns = bodyFields.map((field) => {
    return field.replace(/([A-Z])/g, `_$1`).toLowerCase();
  });

  return { sqlColumns, values };
};

module.exports = extractColumnsAndValues;
