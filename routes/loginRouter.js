const { Router } = require("express");
const loginController = require("../controllers/loginController.js");
const loginRouter = Router();

loginRouter.get("/", loginController.getLoginForm);

module.exports = loginRouter;