const {
  getAllServices,
  getServiceByColumn,
  insertService,
} = require("../repos/services.repo");

const validateService = require("../validation/service.validation");

const router = require("express").Router();

router.get("/", async (req, res) => {
  const results = await getAllServices();
  if (!results) res.status(404).send("no services found");
  res.send(results);
});

router.post("/", async (req, res) => {
  const { error } = validateService(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let { name, lengthInMin, inPerson, price } = req.body;

  try {
    const service = await insertService(
      ["name", "length_in_min", "in_person", "price"],
      [name, lengthInMin, inPerson, price]
    );
    res.send({
      serviceId: service.insertId,
      name,
      lengthInMin,
      inPerson,
      price,
    });
  } catch (error) {
    res.status(500).send("server down");
  }
});

router.get("/id", async (req, res) => {
  const serviceId = req.params.id;
  const service = getServiceByColumn("service_id", serviceId);
  if (!service) res.status(404).send(`service with id ${serviceId} not found`);
  res.send(service);
});

module.exports = router;
