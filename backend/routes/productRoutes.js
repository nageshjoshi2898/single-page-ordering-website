const express = require("express");
const router = express.Router();
const Product = require("../contollers/productsController");

router.get("/", Product.listProducts);
router.post('/query', Product.getProductsByPrompt);

module.exports = router;
