const Product = require("../models/productModel");
const connect_mongo = require("../db/db.js");
exports.listProducts = async (req, res) => {
  const q = req.query.q || "";
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const filter = q
    ? {
        $or: [
          { "Variant SKU": { $regex: q, $options: "i" } },
          { Title: { $regex: q, $options: "i" } },
        ],
      }
    : {};

  try {
    await connect_mongo();

    const skip = (page - 1) * limit;

    const products = await Product.find(filter).skip(skip).limit(limit);

    const total = await Product.countDocuments(filter);

    res.json({
      products,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
};
