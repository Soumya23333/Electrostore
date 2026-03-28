import React, { useEffect, useState } from "react";
import "../index.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  // ✅ Go to Product Details page
  const handleProductClick = (product) => {
    window.scrollTo(0, 0);
    navigate(`/product/${product._id}`);
  };

  return (
    <div className="products-container">
      <h2 className="section-title">🛍️ All Products</h2>

      {products.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: "2rem" }}>
          Loading products...
        </p>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <div
              className="product-card"
              key={product._id}
              onClick={() => handleProductClick(product)} // 👈 Click → Details page
              style={{ cursor: "pointer" }}
            >
              <div className="product-img">
                <img
                  src={product.image || "/images/placeholder.jpg"}
                  alt={product.name}
                />
              </div>

              <h3 className="product-name">{product.name}</h3>
              <p className="product-desc">
                {product.description?.slice(0, 50) || "No description"}
              </p>

              <div className="product-rating">
                {Array.from({ length: 5 }, (_, i) => (
                  <span
                    key={i}
                    className={
                      i < Math.floor(product.rating || 0)
                        ? "star filled"
                        : "star"
                    }
                  >
                    ★
                  </span>
                ))}
                <span className="rating-value">
                  {product.rating ? product.rating.toFixed(1) : "N/A"}
                </span>
              </div>

              <div className="product-footer">
                <span className="product-price">₹{product.price}</span>

                {/* ✅ Buy Now → Checkout */}
                <button
                  className="buy-btn"
                  onClick={(e) => {
                    e.stopPropagation(); // prevent triggering the card click
                    navigate(`/checkout/${product._id}`);
                  }}
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Shop;
