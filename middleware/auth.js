function isAuthenticated(req, res, next) {
  // Passport adds this function to the request
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }

  // Not logged in
  return res.redirect("/login");
}

module.exports = isAuthenticated;