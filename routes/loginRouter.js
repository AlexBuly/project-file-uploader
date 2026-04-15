const { Router } = require("express");
const passport = require("passport");
const loginController = require("../controllers/loginController");

const loginRouter = Router();

loginRouter.get("/", loginController.getLoginForm);

loginRouter.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

module.exports = loginRouter;