const User = require("../models/User");
const jwt = require("jsonwebtoken");

const create_token = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

const login_user = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
        const token = create_token(user._id);
        return res.status(200).json({ email, token });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const signup_user = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.signup(email, password);
        const token = create_token(user._id);
        return res.status(201).json({ email, token });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

module.exports = { login_user, signup_user };
