const getIndexController = async (req, res) => {
    try {
       res.render("index", {title: "Home"}); 
    } catch (err) {
        console.error(err);
        res.status(500).send("Error retrieving page.");
    }
}

module.exports = {
    getIndexController
}