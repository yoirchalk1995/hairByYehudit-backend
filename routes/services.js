const { getAllServices } = require("../repo/services.repo");

const router = require("express").Router();

router.get("/", async (req, res) => {
  const results = await getAllServices();
  if (!results) res.status(404).send("no services found");
  res.send(results);
});
router.post("/", async (req, res) => {});
router.get("/id", async (req, res) => {});

module.exports = router;
