const express = require("express");
const { login_user, signup_user } = require("../controllers/UserController");
const router = express.Router();

// login route
router.post("/login", login_user);

// signup route
router.post("/signup", signup_user);

module.exports = router;
