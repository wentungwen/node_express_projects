// exports is a specific node.js module system, other modules can use require() to access it.
exports.get404 = (req, res, next) => {
  // render the 404 view with pageTitle data
  res.status(404).render("404", {
    path:"/404",
    pageTitle: "Page Not Found",
  });
};
