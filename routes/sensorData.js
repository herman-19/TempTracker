const router = require("express").Router();

const SDController = require("../controllers/sensorData");

// "/sensorData/"" => POST
router.post("/", SDController.postSensorData);

module.exports = router;
