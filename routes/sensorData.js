const router = require("express").Router();

const SDController = require("../controllers/sensorData");

// "/sensorData/"" => POST
router.post("/", SDController.postSensorData);

// "/sensorData/"" => GET
router.get("/latestData", SDController.getSensorData);

module.exports = router;
