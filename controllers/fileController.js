const getUploader = async (req, res) => {
    try {
        res.render("file-upload", {title: "Upload a File"});
    } catch (err) {
        console.error("Page err", err);
        res.status(500).send("Error retrieving page.");
    }
}

module.exports = {
    getUploader
}