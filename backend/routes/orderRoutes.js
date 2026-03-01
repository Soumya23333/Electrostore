const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// Create order
router.post("/", async (req, res) => {
  try {
    const { userId, name, address, mobile, payment, items, total } = req.body;

    const order = new Order({
      userId,
      name,
      address,
      mobile,
      payment,
      items,
      total,
      status: "Placed",
      date: new Date().toLocaleString(),
    });

    await order.save();
    res.status(201).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all orders for a user
router.get("/user/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).sort({ date: -1 });
    res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Cancel order
router.put("/:id/cancel", async (req, res) => {
  try {
    const { cancelReason } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = "Cancelled";
    order.cancelReason = cancelReason;
    order.cancelDate = new Date().toLocaleString();

    await order.save();
    res.status(200).json({ message: "Order cancelled", order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
// DELETE ORDER
router.delete("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    await order.deleteOne(); // remove from DB

    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
