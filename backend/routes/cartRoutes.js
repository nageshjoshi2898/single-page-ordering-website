const express = require("express");
const cartControllers = require("../contollers/cartControllers.js");
require("dotenv").config();

const router = express.Router();

router.put("/:userId", cartControllers.updateCart);

module.exports = router;
