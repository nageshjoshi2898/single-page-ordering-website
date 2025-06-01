const Cart = require("../models/cartModel");
const Product = require("../models/productModel");
exports.updateCart = async (req, res) => {
  const { userId } = req.params;
  const { items } = req.body;

  if (!Array.isArray(items)) {
    return res.status(400).json({ error: "Items must be an array" });
  }

  try {
    const updatedCart = await Cart.findOneAndUpdate(
      { userId },
      { items, updatedAt: Date.now() },
      { upsert: true, setDefaultsOnInsert: true }
    );
    res.json(updatedCart);
  } catch (err) {
    res.status(500).json({ error: "Failed to update cart" });
  }
};

exports.getCart = async (req, res) => {
  const { userId } = req.params;
  try {
    const cart = await Cart.findOne({ userId });

    if (!cart || !cart.items.length) {
      return res.json({ items: [] });
    }

    const enrichedItems = await Promise.all(
      cart.items.map(async (item) => {
        const product = await Product.findById(item.productId).lean();

        if (!product) return null;

        return {
          _id: product._id,
          Title: product.Title,
          "Variant Price": product["Variant Price"],
          "Image Src": product["Image Src"],
          qty: item.quantity,
        };
      })
    );

    res.json({ items: enrichedItems.filter(Boolean) });
  } catch (err) {
    console.error("Error fetching cart:", err);
    res.status(500).json({ error: "Failed to fetch cart" });
  }
};
