const express = require("express");
const connect_mongo = require("./db/db.js");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes.js");

// Create Express applic
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);


// Start server
app.listen(PORT, () => {
  connect_mongo();
  console.log(`Server running on port ${PORT}`);
});
