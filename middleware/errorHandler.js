const logger = require("../utils/logger");

module.exports = function (err, req, res, next) {
  logger.error(err.message, err);
  const status = err.status || 500;
  res.status(status).send({ message: err.message });
};
