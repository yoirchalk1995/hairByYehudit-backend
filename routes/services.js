const { getAllServices, getServiceByColumn } = require("../repo/services.repo");

const router = require("express").Router();

router.get("/", async (req, res) => {
  const results = await getAllServices();
  if (!results) res.status(404).send("no services found");
  res.send(results);
});

router.post("/", async (req, res) => {});

router.get("/id", async (req, res) => {
  const serviceId = req.params.id;
  const service = getServiceByColumn("service_id", serviceId);
  if (!service) res.status(404).send(`service with id ${serviceId} not found`);
  res.send(service);
});

module.exports = router;
