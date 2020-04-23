exports.getIndex = (req, res, next) => {
  try {
    res.render("index", {
      pageTitle: "TempTracker",
      path: "/",
    });
  } catch (err) {
    res.status(400).res.json("Error " + err);
  }
};
