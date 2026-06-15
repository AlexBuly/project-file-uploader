const { Router } = require("express");
const router = Router();

const folderController = require("../controllers/folderController");
const upload = require("../middleware/upload");
const isAuthenticated = require("../middleware/auth");

// All folders
router.get("/", isAuthenticated, folderController.readAllFolders);
router.post("/", isAuthenticated, folderController.createFolder);

// Single folder
router.get("/:id", isAuthenticated, folderController.readSingleFolder);
router.post("/:id/update", isAuthenticated, folderController.updateFolder);
router.post("/:id/delete", isAuthenticated, folderController.deleteFolder);

// Upload file
router.post(
  "/:id/upload",
  isAuthenticated,
  upload.single("file"),
  folderController.uploadFile
);

// Delete file
router.post(
  "/files/:id/delete",
  isAuthenticated,
  folderController.deleteFile
);

module.exports = router;