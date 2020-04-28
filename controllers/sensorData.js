const SDModel = require("../models/sensorData");

// Helper function to store data to database.
async function storeDocument(document) {
  try {
    const newSensorData = new SDModel(document);
    await newSensorData.save();
  } catch (err) {
    throw new Error("Could not store document.");
  }
}

// Construct document of sensor data and store in the database.
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

// Get the latest 10 sensor data points sorted from least to most recent.
exports.getSensorData = async (req, res, next) => {
  try {
    let documents = await SDModel.find().sort({ _id: -1 }).limit(10);
    documents.reverse();

    const data = {
      tArray: [],
      hArray: [],
      timestamps: [],
      ids: [],
    };

    for (const record of documents) {
      data.tArray.push(record.temperature);
      data.hArray.push(record.humidity);
      data.timestamps.push(
        new Date(record.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
      data.ids.push(record._id);
    }

    res.json(data);
  } catch (err) {
    res.status(400).res.json("Error " + err);
  }
};
