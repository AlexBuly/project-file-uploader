const upload = require("../middleware/upload");

const getUploader = async (req, res) => {
    try {
        res.render("file-upload", {title: "Upload a File"});
    } catch (err) {
        console.error("Page err", err);
        res.status(500).send("Error retrieving page.");
    }
}

const fileUpload = async (req, res) => {
    try {
        console.log(req.file);

        res.send("File uploaded successfully!");
    } catch (err) {
        console.error(err);
        res.status(500).send("Upload failed");
    }
};

module.exports = {
    getUploader,
    fileUpload
}