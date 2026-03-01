import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "../index.css"; // 👈 create this new file

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getTotal } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const shippingCost = 50; // ₹50 default

  return (
    <div className="cart-container">
      <div className="cart-box">
        {/* LEFT SIDE */}
        <div className="cart-left">
          <h2>
            Shopping Cart <span>{cartItems.length} items</span>
          </h2>
          <hr />
          {cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} />
              <div className="item-details">
                <p className="category">{item.category || "Product"}</p>
                <p className="name">{item.name}</p>
              </div>

              <div className="quantity-box">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              </div>

              <div className="price">₹{item.price * item.quantity}</div>

              <button className="remove" onClick={() => removeFromCart(item.id)}>×</button>
            </div>
          ))}
          <a href="/shop" className="back-link">← Back to shop</a>
        </div>

        {/* RIGHT SIDE */}
        <div className="cart-right">
          <h3>Summary</h3>

          <div className="summary-row">
            <span>Items {cartItems.length}</span>
            <span>₹{getTotal()}</span>
          </div>

          <div className="summary-row">
            <span>Shipping</span>
            <select>
              <option>Standard Delivery - ₹50</option>
              <option>Express Delivery - ₹100</option>
            </select>
          </div>

          <div className="summary-row code-row">
            <span>Give Code</span>
            <div className="code-input">
              <input type="text" placeholder="Enter your code" />
              <button>→</button>
            </div>
          </div>

          <hr />

          <div className="summary-total">
            <span>Total Price</span>
            <span>₹{getTotal() + shippingCost}</span>
          </div>

          <button className="checkout-btn" onClick={handleCheckout}>
            CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;