const router = require("express").Router();

const Subscriber = require("../models/subcriber");

router.get("/", (req, res, next) => {
  console.log("Subscriber page GET request.");
  res.send("<h1>cool</h1>");
});

module.exports = router;
