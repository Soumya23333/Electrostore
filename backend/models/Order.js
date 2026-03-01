const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Clerk user ID
  name: String,
  address: String,
  mobile: String,
  payment: String,
  items: [
    {
      name: String,
      price: Number,
      quantity: Number,
      image: String, // URL of image
    },
  ],
  total: Number,
  status: { type: String, default: "Placed" },
  cancelReason: String,
  cancelDate: String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", OrderSchema);
