import React, { useEffect, useState } from "react";
import axios from "axios";
import "../index.css";

const API_BASE = "http://localhost:5000/api/products";

const blankForm = {
  name: "",
  description: "",
  category: "Earphone",
  price: "",
  offerPrice: "",
  image: "",
  purchaseYear: "",
  warranty: ""
};

function SellerDashboard() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(blankForm);
  const [editingProduct, setEditingProduct] = useState(null);

  const savedTab = localStorage.getItem("activePage") || "list";
  const [activePage, setActivePage] = useState(savedTab);

  useEffect(() => {
    localStorage.setItem("activePage", activePage);
  }, [activePage]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(API_BASE);
      setProducts(res.data);
    } catch (err) {
      console.error("Fetch products error:", err);
      alert("❌ Failed to load products");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        const res = await axios.put(`${API_BASE}/${editingProduct._id}`, form);
        setProducts((prev) =>
          prev.map((p) => (p._id === res.data._id ? res.data : p))
        );
        alert("✏️ Product updated!");
      } else {
        const res = await axios.post(API_BASE, form);
        setProducts((prev) => [res.data, ...prev]);
        alert("✅ Product added!");
      }
      setForm(blankForm);
      setEditingProduct(null);
      setActivePage("list");
    } catch (err) {
      console.error("Save product error:", err);
      alert("❌ Failed to save product");
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setForm(product);
    setActivePage("add");
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setForm(blankForm);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await axios.delete(`${API_BASE}/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
      alert("🗑️ Product deleted");
    } catch (err) {
      console.error("Delete error:", err);
      alert("❌ Failed to delete product");
    }
  };

  return (
    <div className="seller-dashboard">
      <aside className="sidebar">
        <h1 className="logo">Seller Panel</h1>
        <nav>
          <ul>
            <li
              className={activePage === "add" ? "active" : ""}
              onClick={() => {
                setActivePage("add");
                setEditingProduct(null);
                setForm(blankForm);
              }}
            >
              ➕ Add Product
            </li>
            <li
              className={activePage === "list" ? "active" : ""}
              onClick={() => setActivePage("list")}
            >
              📦 Product List
            </li>
            <li onClick={() => alert("Orders coming soon")}>📝 Orders</li>
          </ul>
        </nav>
      </aside>

      <main className="main-content">
        {activePage === "add" && (
          <form onSubmit={handleSubmit} className="product-form">
            <h3>{editingProduct ? "✏️ Edit Product" : "➕ Add Product"}</h3>

            <input type="text" name="name" placeholder="Product Name" value={form.name} onChange={handleChange} required />
            <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} />

            <select name="category" value={form.category} onChange={handleChange}>
              <option>Earphone</option>
              <option>Smartphone</option>
              <option>Laptop</option>
              <option>Smartwatch</option>
              <option>Other</option>
            </select>

            <input type="number" name="price" placeholder="Price" value={form.price} onChange={handleChange} required />
            <input type="number" name="offerPrice" placeholder="Offer Price" value={form.offerPrice} onChange={handleChange} />

            <input type="text" name="image" placeholder="Image URL" value={form.image} onChange={handleChange} required />

            {form.image && <img src={form.image} alt="preview" width="120" />}

            {/* NEW FIELDS */}
            <input type="number" name="purchaseYear" placeholder="Purchase Year (Ex: 2023)" value={form.purchaseYear} onChange={handleChange} />

            <input type="text" name="warranty" placeholder="Warranty (Ex: 1 Year / 6 Months)" value={form.warranty} onChange={handleChange} />

            <div className="form-actions">
              <button type="submit">{editingProduct ? "Update" : "Add"}</button>
              {editingProduct && (<button type="button" onClick={handleCancelEdit}>Cancel</button>)}
            </div>
          </form>
        )}

        {activePage === "list" && (
          <>
            <h3>📦 Your Products</h3>
            <ul className="product-list">
              {products.map((p) => (
                <li key={p._id} className="product-item">
                  <img src={p.image} alt={p.name} />
                  <div>
                    <h4>{p.name}</h4>
                    <p>₹{p.price} {p.offerPrice && `(Offer: ₹${p.offerPrice})`}</p>
                    <small>{p.category}</small>
                    {/* show new fields */}
                    <small>Year: {p.purchaseYear}</small><br/>
                    <small>Warranty: {p.warranty}</small>
                  </div>
                  <div className="actions">
                    <button onClick={() => handleEdit(p)}>✏️ Edit</button>
                    <button onClick={() => handleDelete(p._id)}>🗑️ Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </main>
    </div>
  );
}

export default SellerDashboard;
