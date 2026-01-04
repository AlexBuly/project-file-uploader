const getLoginForm = async (req, res) => {
    try {
        res.render("login-form", {title: "Login"})
    } catch (err) {
        console.error("Login err", err);
        res.status(500).send("Error logging in.");
    }
}

module.exports = {
    getLoginForm
}