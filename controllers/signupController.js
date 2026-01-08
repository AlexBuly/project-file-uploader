const bcrypt = require("bcryptjs");
const prisma = require("../lib/prisma");

const getSignupForm = async (req, res) => {
    try {
        res.render("sign-up-form", {title: "Sign Up"})
    } catch (err) {
        console.error("Sign up err", err);
        res.status(500).send("Error with sign up.");
    }
}

const createUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const hashed = await bcrypt.hash(password, 10);

        await prisma.user.create({
      data: {
        username: username,
        password: hashed,
      },
    });
    res.redirect("/login");
    } catch (err) {
        console.error(err);
        res.status(500).send("Signup error");
    }
}

module.exports = {
    getSignupForm,
    createUser
}