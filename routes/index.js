const router = require("express").Router();

const SDController = require("../controllers/sensorData");

// "/"" => GET
router.get("/", SDController.getSensorData);

module.exports = router;
