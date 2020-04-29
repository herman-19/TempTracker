const Subscriber = require("../models/subcriber");

exports.getAddSubscriber = (req, res, next) => {
  res.render("addSubscriber", {
    pageTitle: "Add Subscriber",
    path: "/subscriber/add"
  });
};

exports.getEditSubscribers = async (req, res, next) => {
  try {
    const subs = await Subscriber.find();
    res.render("editSubscriber", {
      pageTitle: "Edit Subscribers",
      subscribers: subs,
      path: "/subscriber/edit"
    });
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
};

exports.postAddSubscriber = async (req, res, next) => {
  try {
    console.log(req.body);
    const newSub = new Subscriber({
      name: req.body.inputName,
      email: req.body.inputEmail,
    });

    await newSub.save();
    console.log("New Subscriber added!");
    res.redirect("/");
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
};

exports.updateSubscriber = async (req, res, next) => {
  try {
    const sub = await Subscriber.findById(req.params.id);
    sub.name = req.body.inputName;
    sub.email = req.body.inputEmail;
    
    await sub.save();
    res.json('Subscriber updated!');
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
};

exports.deleteSubscriber = async (req, res, next) => {
  try {
    await Subscriber.findByIdAndDelete(req.params.id);
    res.json('Subscriber deleted.');
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
};