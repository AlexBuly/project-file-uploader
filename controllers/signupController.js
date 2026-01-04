const getSignupForm = async (req, res) => {
    try {
        res.render("sign-up-form", {title: "Sign Up"})
    } catch (err) {
        console.error("Sign up err", err);
        res.status(500).send("Error with sign up.");
    }
}

module.exports = {
    getSignupForm
}