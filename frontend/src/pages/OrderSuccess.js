import React, { useEffect } from "react";
import "../index.css";
import { useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const navigate = useNavigate();

  // Auto redirect after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/orders");
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="success-page">
      <div className="success-content">
        <div className="checkmark">
          <div className="circle">
            <div className="tick">✔</div>
          </div>
        </div>
        <h2>Order Placed Successfully</h2>
      </div>
    </div>
  );
};

export default OrderSuccess;