const express = require("express");
const connect_mongo = require("./db/db.js");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes.js");
const productRoutes = require("./routes/productRoutes.js");
const cartRoutes = require("./routes/cartRoutes.js");
const auth = require("./middleware/auth.js");
// Create Express application
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true // if you're using cookies or auth headers
  })
);
// Routes
app.get("/", (req, res) => {
  res.send("Backend is deployed and running ✅");
});

app.use("/api/auth", authRoutes);

app.use("/api/products", auth, productRoutes);
app.use("/api/cart", auth, cartRoutes);

// Start server
app.listen(PORT, () => {
  connect_mongo();
  console.log(`Server running on port ${PORT}`);
});
