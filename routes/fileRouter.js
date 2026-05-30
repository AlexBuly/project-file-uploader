const { Router } = require("express");
const fileController = require("../controllers/fileController.js");
const fileRouter = Router();
const upload = require("../middleware/upload");

fileRouter.get("/", fileController.getUploader);
fileRouter.post("/", upload.single("file"), fileController.fileUpload);

module.exports = fileRouter;