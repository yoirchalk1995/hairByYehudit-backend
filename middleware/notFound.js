module.exports = function (req, res, next) {
  res.status(404).send("route not found");
};
