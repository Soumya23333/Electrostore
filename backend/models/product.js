const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  offerPrice: Number,   // ✅ added
  rating: Number,
  image: String,
  category: String,
  purchaseYear: { type: Number },
  warranty: { type: String },
});

module.exports = mongoose.model("Product", productSchema);
