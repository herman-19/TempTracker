const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let SubscriberSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    tempLimit: {type: Number, required: true }
  },
  { timestamps: true }
);

// export the "Subscriber" model
module.exports = mongoose.model("Subscriber", SubscriberSchema);
