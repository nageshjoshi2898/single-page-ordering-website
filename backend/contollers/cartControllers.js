const Cart = require("../models/cartModel");

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
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    res.json(updatedCart);
  } catch (err) {
    res.status(500).json({ error: "Failed to update cart" });
  }
};
