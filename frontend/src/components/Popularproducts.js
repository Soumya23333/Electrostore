import { useNavigate } from "react-router-dom";
import productsData from "../data/ProductData";
import React from "react";

const PopularProducts = () => {
  const navigate = useNavigate();

  if (!productsData || productsData.length === 0) {
    return <h2 style={{ textAlign: "center" }}>⚠ No products found</h2>;
  }

  const popularItems = productsData.slice(0, 8);

  // ✅ Navigate to Shop page
  const handleGoToShop = () => {
    navigate("/shop");
  };

  return (
    <section style={{ padding: "40px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
        Popular Products
      </h2>

      {/* 🛍 Popular Product Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "25px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {popularItems.map((item) => (
          <div
            key={item.id}
            onClick={handleGoToShop}
            style={{
              textAlign: "left",
              cursor: "pointer",
              transition: "transform 0.2s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.03)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "scale(1)")
            }
          >
            {/* Image box */}
            <div
              style={{
                border: "1px solid #ddd",
                padding: "29px",
                background: "#f1f1f6ff",
                height: "150px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{
                  maxWidth: "100%",
                  maxHeight: "180px",
                  objectFit: "contain",
                }}
              />
            </div>

            {/* Product details */}
            <h3
              style={{
                fontSize: "14px",
                margin: "10px 0 5px",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              {item.name}
            </h3>
            <p style={{ fontWeight: "bold", margin: "5px 0" }}>₹{item.price}</p>

            <div
              style={{
                display: "flex",
                justifyContent: "left",
                alignItems: "center",
                gap: "5px",
                marginTop: "5px",
              }}
            >
              <span style={{ color: "#ee6b19ff", fontSize: "10px" }}>⭐⭐⭐⭐⭐</span>
              <span style={{ fontSize: "13px", color: "#555" }}>
                {item.rating}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 👇 "See Details" Button */}
      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <button
          onClick={handleGoToShop}
          style={{
            padding: "12px 30px",
            background: "#ff6d0c",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
            transition: "background 0.3s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#e05d00")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#ff6d0c")}
        >
          See Details →
        </button>
      </div>

      {/* 🎮 Gaming Banner */}
      <section
        style={{
          marginTop: "60px",
          padding: "60px 20px",
          borderRadius: "12px",
          background: "#d8dfe7",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "20px",
          maxWidth: "1100px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <img
          src="/images/products/jbl.webp"
          alt="Gaming Speaker"
          style={{ maxWidth: "200px", borderRadius: "10px" }}
        />

        <div style={{ flex: 1, textAlign: "center" }}>
          <h2 style={{ fontSize: "22px", marginBottom: "10px" }}>
            Level Up Your Gaming Experience
          </h2>
          <p style={{ color: "#555", marginBottom: "15px" }}>
            From immersive sound to precise controls—everything you need to win
          </p>
          <button
            style={{
              padding: "10px 20px",
              background: "#ff6d0c",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Buy now →
          </button>
        </div>

        <img
          src="/images/products/controller1.png"
          alt="Gaming Controller"
          style={{ maxWidth: "200px", borderRadius: "10px" }}
        />
      </section>

      {/* ✉ Subscribe Section */}
      <section
        style={{
          marginTop: "60px",
          textAlign: "center",
          padding: "40px",
          background: "#fff",
          border: "1px solid #eee",
          borderRadius: "12px",
        }}
      >
        <h2 style={{ fontSize: "24px", marginBottom: "10px" }}>
          Subscribe now & get 20% off
        </h2>
        <p style={{ color: "#666", marginBottom: "20px" }}>
          Get the latest offers, new arrivals, and exclusive deals straight to
          your inbox.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
          <input
            type="email"
            placeholder="Enter your email id"
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              width: "250px",
            }}
          />
          <button
            style={{
              padding: "10px 20px",
              background: "#ff6d0c",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Subscribe
          </button>
        </div>
      </section>
    </section>
  );
};

export default PopularProducts;
