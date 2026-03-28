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
  const [isLoading, setIsLoading] = useState(true);
  const [animatingRelatedId, setAnimatingRelatedId] = useState(null);

  // Scroll to top when product loads or ID changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    // check dummy data first
    const dummyProduct = products.find((p) => String(p.id) === id);
    if (dummyProduct) {
      setProduct(dummyProduct);
      setMainImage(dummyProduct.image);
      setIsLoading(false);
      return;
    }

    // fetch backend
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setMainImage(data.image);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setIsLoading(false);
      });
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

  // Get related products (exclude current product)
  const relatedProducts = products
    .filter((p) => String(p.id) !== id)
    .slice(0, 4);

  const handleRelatedProductClick = (relatedProduct) => {
    setAnimatingRelatedId(relatedProduct.id);
    setTimeout(() => {
      window.scrollTo(0, 0);
      navigate(`/product/${relatedProduct.id}`);
    }, 300);
  };

  return (
    <>
      <div className={`product-details ${!isLoading ? "animate-in" : ""}`}>
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

      {/* ========== RELATED PRODUCTS SECTION ========== */}
      <section className="related-products-section">
        <div className="related-products-container">
          <h2 className="related-title">🛍️ Related Products</h2>
          <p className="related-subtitle">You might also like these items</p>

          <div className="related-products-grid">
            {relatedProducts.map((relatedProduct) => (
              <div
                key={relatedProduct.id}
                className={`related-product-card ${animatingRelatedId === relatedProduct.id ? "animate-out" : ""}`}
                onClick={() => handleRelatedProductClick(relatedProduct)}
              >
                <div className="related-product-image">
                  <img src={relatedProduct.image} alt={relatedProduct.name} />
                </div>
                <div className="related-product-info">
                  <h3>{relatedProduct.name}</h3>
                  <p className="related-category">{relatedProduct.category || "Electronics"}</p>
                  <div className="related-price">
                    <span className="price-current">₹{relatedProduct.price}</span>
                    {relatedProduct.oldPrice && (
                      <span className="price-old">₹{relatedProduct.oldPrice}</span>
                    )}
                  </div>
                  <div className="related-rating">
                    {Array.from({ length: 5 }, (_, i) => (
                      <span key={i} className={i < Math.floor(relatedProduct.rating || 0) ? "star filled" : "star"}>
                        ★
                      </span>
                    ))}
                    <span className="rating-num">({relatedProduct.rating || 0})</span>
                  </div>
                  <button className="view-btn">View Details →</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default ProductDetails;
