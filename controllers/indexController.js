const getIndexController = async (req, res) => {
    try {
       res.render("index", {
        title: "Home",
        user: req.user
    }); 
    } catch (err) {
        console.error(err);
        res.status(500).send("Error retrieving page.");
    }
}

module.exports = {
    getIndexController
}