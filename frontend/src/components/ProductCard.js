import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../index.css";

function ProductCard({ id, name, title, price, image, img, description, desc }) {
  const navigate = useNavigate();
  const [isAnimating, setIsAnimating] = useState(false);

  const productId = id || name || title;
  const productImage = image || img;
  const productDescription = description || desc;

  const handleClick = () => {
    setIsAnimating(true);
    // Wait for animation to complete before navigating
    setTimeout(() => {
      navigate(`/product/${productId}`);
    }, 300);
  };

  return (
    <div 
      className={`product-card ${isAnimating ? "animate-out" : ""}`}
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      <div className="product-image">
        <img src={productImage} alt={name || title} />
      </div>
      <div className="product-info">
        <h3>{name || title}</h3>
        {productDescription && <p className="description">{productDescription}</p>}
        <p className="price">₹{price}</p>
        <button className="view-details-btn">View Details</button>
      </div>
    </div>
  );
}

export default ProductCard;