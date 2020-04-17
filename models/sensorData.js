const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let SensorDataSchema = new Schema(
  {
    temperature: { type: Number, required: true },
    humidity: { type: Number, required: true },
  },
  { timestamps: true }
);

// export the "SensorData" model
module.exports = mongoose.model("SensorData", SensorDataSchema);
