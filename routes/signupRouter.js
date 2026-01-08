const { Router } = require("express");
const signupController = require("../controllers/signupController");
const signupRouter = Router();

signupRouter.get("/", signupController.getSignupForm);
signupRouter.post("/", signupController.createUser);

module.exports = signupRouter;