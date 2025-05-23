const {
  deleteService,
  insertService,
  getAllServices,
  getServiceByColumn,
  updateService,
} = require("../repos/services.repo");

const extractValuesAndColumnNames = require("../utils/extractColumnsAndValues");
const validateService = require("../validation/service.validation");

const router = require("express").Router();

router.get("/", async (req, res) => {
  const results = await getAllServices();
  if (!results) res.status(404).send("no services found");
  res.send(results);
});

router.post("/", async (req, res) => {
  const { error } = validateService(req.body, "post");
  if (error) return res.status(400).send(error.details[0].message);

  let { name, lengthInMin, inPerson, price } = req.body;

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
});

router.get("/:id", async (req, res) => {
  const serviceId = req.params.id;
  console.log(serviceId);
  const service = await getServiceByColumn("service_id", serviceId);
  if (!service) res.status(404).send(`service with id ${serviceId} not found`);
  res.send(service);
});

router.delete("/:id", async (req, res) => {
  const serviceId = req.params.id;
  const service = await getServiceByColumn("service_id", serviceId);
  await deleteService(serviceId);
  res.send(service);
});

router.patch("/:id", async (req, res) => {
  const serviceId = req.params.id;

  const { error } = validateService(req.body, "patch");
  if (error) return res.status(400).send(error.details[0].message);

  const { values, sqlColumns } = extractValuesAndColumnNames(req.body);

  await updateService(sqlColumns, values, serviceId);
  const service = await getServiceByColumn("service_id", serviceId);
  res.send(service);
});

module.exports = router;
