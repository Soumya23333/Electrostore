import React from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";

function Category() {
  const { name } = useParams();

  // Temporary dummy products
  const products = [
    { id: 1, name: `${name} Product 1`, price: 100, image: "https://via.placeholder.com/150" },
    { id: 2, name: `${name} Product 2`, price: 200, image: "https://via.placeholder.com/150" },
    { id: 3, name: `${name} Product 3`, price: 300, image: "https://via.placeholder.com/150" },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>{name.toUpperCase()}</h2>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {products.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}

export default Category;
