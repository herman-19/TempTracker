const SDModel = require("../models/sensorData");

async function storeDocument(document) {
  try {
    const newSensorData = new SDModel(document);
    await newSensorData.save();
  } catch (err) {
    throw new Error("Could not store document.");
  }
}

module.exports.postSensorData = async (req, res, next) => {
  try {
    const doc = {
      data: {
        temperature: parseInt(req.body.temp),
        humidity: parseInt(req.body.humidity),
      },
    };
    await storeDocument(doc);
    console.log("new sensor data stored.");
    res.send("[Server]: Data stored!");
  } catch (err) {
    res.status(400).res.json("Error: " + err);
  }
};

module.exports.getSensorData = async (req, res, next) => {
  try {
    const documents = await SDModel.find();
    res.json(documents);
  } catch (err) {
    res.status(400).res.json("Error " + err);
  }
};
