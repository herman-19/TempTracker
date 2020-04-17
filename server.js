const path = require('path');

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

require("dotenv").config();

const sensorDataRoutes = require("./routes/sensorData");
const subscriberRoutes = require("./routes/subscriber");
const indexRoutes = require("./routes/index");

const app = express();
const uri = process.env.ATLAS_URI;
const port = process.env.PORT || 8000;

// MongoDB setup.
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connection established.");
});

// EJS Template Engine
app.set("view engine", "ejs");
app.set("views", "views");

// Body parsing middleware.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Routes.
app.use("/sensorData", sensorDataRoutes);
app.use("/subscriber", subscriberRoutes);
app.use(indexRoutes);

// Catch all.
app.use((req, res, next) => {
  res.render('404', {
      pageTitle: "Page Not Found",
      path: "unknown"
  })
});

app.listen(port, () => {
  console.log(`Server listening on Port ${port}...`);
});
