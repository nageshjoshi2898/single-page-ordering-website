const express = require("express");
const authControllers = require("../contollers/authControllers.js");
require("dotenv").config();

const router = express.Router();

router.post("/signup", authControllers.signUp);

router.post("/signin", authControllers.signIn);

module.exports = router;
