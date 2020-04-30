const router = require("express").Router();

const SubController = require("../controllers/subscriber");

// "/subscriber/add"" => GET
router.get("/add", SubController.getAddSubscriber);

// "/subscriber/edit"" => GET
router.get("/edit", SubController.getEditSubscribers);

// "/subscriber/edit/:id"" => GET
router.get("/edit/:id", SubController.getEditSingleSubscriber);

// "/subscriber/add"" => POST
router.post("/add", SubController.postAddSubscriber);

// "/subscriber/update/:id"" => POST
router.post('/update/', SubController.updateSubscriber);
// Note: html form does not support http PUT method.

// "/subscriber/delete/:id"" => DELETE
router.delete('/delete/:id', SubController.deleteSubscriber);

module.exports = router;
