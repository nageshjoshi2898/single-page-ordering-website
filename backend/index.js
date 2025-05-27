const express = require("express");
const connect_mongo = require("./db/db.js");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

const app = express();

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello" });
});
app.use(express.json());

app.listen(PORT, () => {
  connect_mongo();
  console.log(`Server running on port ${PORT}`);
});
