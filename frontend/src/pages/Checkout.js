import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import "../index.css";

const Checkout = () => {
  const { cartItems, getTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const { user } = useUser();

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    mobile: "",
    payment: "cod",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Login check (fixes "Cannot read properties of null (reading 'id')")
    if (!user) {
      alert("⚠️ Please log in first to place your order!");
      navigate("/sign-in"); // redirects to Clerk sign-in page
      return;
    }

    if (!formData.name || !formData.address || !formData.mobile) {
      alert("⚠️ Please fill all details before placing your order.");
      return;
    }

    const orderData = {
      userId: user.id,
      name: formData.name,
      address: formData.address,
      mobile: formData.mobile,
      payment: formData.payment,
      total: getTotal(),
      items: cartItems.map((item) => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image || "https://via.placeholder.com/80",
      })),
      date: new Date().toLocaleString(),
      status: "Placed",
    };

    try {
      await axios.post("http://localhost:5000/api/orders", orderData);
      clearCart();
      alert("✅ Order placed successfully!");
      navigate("/order-success");
    } catch (err) {
      console.error("❌ Order failed:", err);
      alert("Failed to place order. Please try again later.");
    }
  };

  return (
    <div className="checkout-container">
      <div className="checkout-box">
        <h2>Checkout</h2>
        <form className="checkout-form" onSubmit={handleSubmit}>
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>Mobile Number</label>
          <input
            type="tel"
            name="mobile"
            placeholder="Enter your mobile number"
            value={formData.mobile}
            onChange={handleChange}
            required
          />

          <label>Address</label>
          <textarea
            name="address"
            placeholder="Enter your full address"
            value={formData.address}
            onChange={handleChange}
            required
          />

          <label>Payment Method</label>
          <div className="payment-options">
            <label>
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={formData.payment === "cod"}
                onChange={handleChange}
              />
              Cash on Delivery
            </label>
            <label>
              <input
                type="radio"
                name="payment"
                value="upi"
                checked={formData.payment === "upi"}
                onChange={handleChange}
              />
              UPI / Wallet
            </label>
            <label>
              <input
                type="radio"
                name="payment"
                value="card"
                checked={formData.payment === "card"}
                onChange={handleChange}
              />
              Credit / Debit Card
            </label>
          </div>

          <div className="checkout-summary">
            <p>
              <strong>Total Price:</strong> ₹{getTotal()}
            </p>
          </div>

          <button type="submit" className="place-btn">
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
