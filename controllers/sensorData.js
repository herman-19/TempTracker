const SDModel = require("../models/sensorData");

async function storeDocument(document) {
  try {
    const newSensorData = new SDModel(document);
    await newSensorData.save();
  } catch (err) {
    throw new Error("Could not store document.");
  }
}

exports.postSensorData = async (req, res, next) => {
  try {
    const doc = {
      temperature: parseInt(req.body.temp),
      humidity: parseInt(req.body.humidity),
    };
    await storeDocument(doc);
    console.log("new sensor data stored.");
    res.send("[Server]: Data stored!");
  } catch (err) {
    res.status(400).res.json("Error: " + err);
  }
};

exports.getSensorData = async (req, res, next) => {
  try {
    const documents = await SDModel.find();
    
    const data = {
      tArray: [],
      hArray: [],
      timestamps: [],
    };

    for (record of documents) {
      data.tArray.push(record.temperature);
      data.hArray.push(record.humidity);
      data.timestamps.push(record.createdAt);
    }

    res.json(data);
  } catch (err) {
    res.status(400).res.json("Error " + err);
  }
};
