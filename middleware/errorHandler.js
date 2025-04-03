module.exports = function (err, req, res, next) {
  const status = err.status || 500;
  res.status(status).send({ message: err.message });
};
