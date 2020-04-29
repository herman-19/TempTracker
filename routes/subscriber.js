const router = require("express").Router();

const SubController = require("../controllers/subscriber");

// "/subscriber/add"" => GET
router.get("/add", SubController.getAddSubscriber);

// "/subscriber/edit"" => GET
router.get("/edit", SubController.getEditSubscribers);

// "/subscriber/add"" => POST
router.post("/add", SubController.postAddSubscriber);

// "/subscriber/update/:id"" => POST
router.post('/update/:id', SubController.updateSubscriber);

// "/subscriber/delete/:id"" => DELETE
router.delete('/delete/:id', SubController.deleteSubscriber);

module.exports = router;
