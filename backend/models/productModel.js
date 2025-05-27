const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  Handle: { type: String, required: true },
  Title: { type: String, required: true },
  Body: String,
  Vendor: String,
  Type: String,
  Tags: String,

  "Option1 Name": String,
  "Option1 Value": String,
  "Option2 Name": String,
  "Option2 Value": String,
  "Option3 Name": String,
  "Option3 Value": String,

  "Variant SKU": { type: String, required: true, unique: true },
  "Variant Grams": Number,
  "Variant Inventory Tracker": String,
  "Variant Inventory Qty": Number,
  "Variant Inventory Policy": String,
  "Variant Fulfillment Service": String,
  "Variant Price": Number,
  "Variant Compare At Price": String,

  "Image Src": String
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
