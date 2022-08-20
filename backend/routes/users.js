const express = require("express");
const { login_user, signup_user } = require("../controllers/UserController");
const router = express.Router();

router.post("/login", login_user);

router.post("/signup", signup_user);

module.exports = router;
