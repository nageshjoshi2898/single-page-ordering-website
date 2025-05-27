const express = require("express");
const connect_mongo = require("./db/db.js");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes.js");
const productRoutes = require("./routes/productRoutes.js");
const auth = require("./middleware/auth.js");
// Create Express application
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Auth routes
app.use("/api/auth", authRoutes);

app.use("/api/products", auth, productRoutes);

// Start server
app.listen(PORT, () => {
  connect_mongo();
  console.log(`Server running on port ${PORT}`);
});
