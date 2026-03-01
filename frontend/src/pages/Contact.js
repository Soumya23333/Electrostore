import React, { useState } from "react";
import "../index.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dateOfPurchase: "",
    category: "",
    price: "",
    paymentMode: "",
    issue: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Just show success message (no backend)
    setSubmitted(true);

    // Clear form
    setFormData({
      name: "",
      email: "",
      dateOfPurchase: "",
      category: "",
      price: "",
      paymentMode: "",
      issue: "",
    });

    // Optional: hide success message after a few seconds
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="support-container">
      <h2>Customer Support Form</h2>
      <p>Facing an issue with your product? Fill out the form below.</p>

      <form className="support-form" onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Date of Purchase:</label>
        <input
          type="date"
          name="dateOfPurchase"
          value={formData.dateOfPurchase}
          onChange={handleChange}
          required
        />

        <label>Product Category:</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">-- Select Category --</option>
          <option value="Laptop">Laptop</option>
          <option value="Mobile">Mobile</option>
          <option value="Headphones">Headphones</option>
          <option value="Accessories">Accessories</option>
        </select>

        <label>Price (₹):</label>
        <input
          type="number"
          name="price"
          placeholder="Enter product price"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <label>Mode of Payment:</label>
        <select
          name="paymentMode"
          value={formData.paymentMode}
          onChange={handleChange}
          required
        >
          <option value="">-- Select Payment Mode --</option>
          <option value="Credit Card">Credit Card</option>
          <option value="Debit Card">Debit Card</option>
          <option value="UPI">UPI</option>
          <option value="Net Banking">Net Banking</option>
          <option value="Cash on Delivery">Cash on Delivery</option>
        </select>

        <label>Issue Description:</label>
        <textarea
          name="issue"
          placeholder="Describe the issue in detail"
          value={formData.issue}
          onChange={handleChange}
          required
        />

        <button type="submit">Submit Issue</button>
      </form>

      {/* ✅ Success Message */}
      {submitted && (
        <div className="success-message">
          ✅ Your issue has been submitted successfully!
        </div>
      )}
    </div>
  );
}

export default Contact;