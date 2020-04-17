const router = require("express").Router();

const IndexController = require("../controllers/index");

// "/"" => GET
router.get("/", IndexController.getIndex);

module.exports = router;
