const User = require("../models/User");

const login_user = async (req, res) => {
    res.json({ msg: "login user" });
};

const signup_user = async (req, res) => {
    res.json({ msg: "signup user" });
};

module.exports = { login_user, signup_user };
