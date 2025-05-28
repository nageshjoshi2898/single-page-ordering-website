const express = require("express");
const router = express.Router();
const Product = require("../contollers/productsController");

router.get("/", Product.listProducts);

module.exports = router;
