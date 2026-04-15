const { Router } = require("express");
const fileController = require("../controllers/fileController.js");
const fileRouter = Router();

fileRouter.get("/", fileController.getUploader);

module.exports = fileRouter;