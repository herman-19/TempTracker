exports.getIndex = (req, res, next) => {
    res.render("index", {
        pageTitle: "TempTracker",
        path: "/"
    });
};