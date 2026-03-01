import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import "../index.css";

const OrdersPage = () => {
  const { user } = useUser();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      try {
        const res = await axios.get(`http://localhost:5000/api/orders/user/${user.id}`);
        setOrders(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOrders();
  }, [user]);

  const handleCancel = async (orderId) => {
    const reason = prompt("Please enter the reason for cancelling this order:");
    if (!reason || reason.trim() === "") {
      alert("Cancellation reason is required!");
      return;
    }
    try {
      await axios.put(`http://localhost:5000/api/orders/${orderId}/cancel`, { cancelReason: reason });
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId
            ? { ...order, status: "Cancelled", cancelReason: reason, cancelDate: new Date().toLocaleString() }
            : order
        )
      );
      alert("✅ Order cancelled successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to cancel order.");
    }
  };

  const handleDelete = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order permanently?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/orders/${orderId}`);
      setOrders((prev) => prev.filter((order) => order._id !== orderId));
      alert("🗑️ Order deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to delete order.");
    }
  };

  return (
    <div className="orders-page">
      <h2 className="orders-title">Your Orders</h2>
      {orders.length === 0 ? (
        <p className="no-orders">No orders found.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <div className="order-header">
                <span>Order #{order._id}</span>
                <span className={`order-status ${order.status === "Cancelled" ? "cancelled" : "placed"}`}>
                  {order.status}
                </span>
              </div>

              <p className="order-date">📅 {order.date}</p>

              {/* MULTIPLE ITEMS */}
              <div className="order-items">
                {order.items.map((item, index) => (
                  <div key={index} className="order-item">
                    <img
                      src={item.image || "https://cdn-icons-png.flaticon.com/512/679/679720.png"}
                      alt={item.name}
                      className="order-item-img"
                    />
                    <div className="order-item-info">
                      <h4>{item.name}</h4>
                      <p>₹{item.price} × {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-summary">
                <p><strong>Name:</strong> {order.name}</p>
                <p><strong>Mobile:</strong> {order.mobile}</p>
                <p><strong>Address:</strong> {order.address}</p>
                <p><strong>Payment:</strong> {order.payment}</p>
                <p><strong>Total:</strong> ₹{order.total}</p>
              </div>

              {order.status === "Cancelled" ? (
                <div className="cancel-info">
                  <p><strong>Cancelled On:</strong> {order.cancelDate}</p>
                  <p><strong>Reason:</strong> {order.cancelReason}</p>

                  <button className="delete-btn" onClick={() => handleDelete(order._id)}>
                    Delete Order
                  </button>
                </div>
              ) : (
                <button className="cancel-btn" onClick={() => handleCancel(order._id)}>Cancel Order</button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
