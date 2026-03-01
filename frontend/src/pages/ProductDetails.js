import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext"; 
import products from "../data/ProductData"; 
import "../index.css";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    // check dummy data first
    const dummyProduct = products.find((p) => String(p.id) === id);
    if (dummyProduct) {
      setProduct(dummyProduct);
      setMainImage(dummyProduct.image);
      return;
    }

    // fetch backend
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setMainImage(data.image);
      })
      .catch((err) => console.error("Error fetching product:", err));
  }, [id]);

  if (!product) {
    return <h2 className="not-found">Product Not Found</h2>;
  }

  const images = [product.image, ...(product.images || [])];

  const handleAddToCart = () => {
    addToCart({
      id: product.id || product._id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    alert(`${product.name} added to your cart 🛒`);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/cart");
  };

  return (
    <div className="product-details">
      {/* Left Images */}
      <div className="image-section">
        <div className="main-image">
          <img src={mainImage} alt={product.name} />
        </div>

        <div className="thumbnails">
          {images.map((img, idx) => (
            <div
              key={idx}
              className={`thumb ${mainImage === img ? "active" : ""}`}
              onClick={() => setMainImage(img)}
            >
              <img src={img} alt={`${product.name}-${idx}`} />
            </div>
          ))}
        </div>
      </div>

      {/* Right Details */}
      <div className="details-section">
        <h1>{product.name}</h1>
        <p>{product.description}</p>

        <div className="price">
          <span className="offer">₹{product.price}</span>
          {product.oldPrice && <span className="old">₹{product.oldPrice}</span>}
        </div>

        {/* NEW 2 FIELDS DISPLAY */}
        <div className="extra-info">
          <p><strong>Purchase Year:</strong> {product.purchaseYear || "N/A"}</p>
          <p><strong>Warranty:</strong> {product.warranty || "N/A"}</p>
        </div>

        <div className="buttons">
          <button className="btn" onClick={handleAddToCart}>
            Add to Cart
          </button>
          <button className="btn buy" onClick={handleBuyNow}>
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
