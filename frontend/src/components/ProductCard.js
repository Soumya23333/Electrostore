import ProductCard from "../components/ProductCard";

function Home() {
  const products = [
    { title: "Apple AirPods Pro", desc: "2nd Gen", price: "399.99", img: "https://via.placeholder.com/200" },
    { title: "Canon EOS R5", desc: "Mirrorless Camera", price: "3899.99", img: "https://via.placeholder.com/200" },
    { title: "PlayStation 5", desc: "Gaming Console", price: "499.99", img: "https://via.placeholder.com/200" },
  ];

  return (
    <div className="products">
      <h2>Popular Products</h2>
      <div className="product-grid">
        {products.map((p, i) => (
          <ProductCard key={i} {...p} />
        ))}
      </div>
    </div>
  );
}

export default Home;