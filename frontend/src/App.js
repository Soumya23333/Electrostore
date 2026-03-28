// src/App.js
import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Category from "./pages/Category";
import Shop from "./components/Shop";
import SellerDashboard from "./pages/SellerDashboard";
import ProductDetails from "./pages/ProductDetails";
import Contact from "./pages/Contact";
import Orders from "./pages/OrdersPage";
import AccessDenied from "./pages/AccessDenied";
import { ADMIN_ID } from "./utils/checkAdmin";

import { CartProvider } from "./context/CartContext"; // ✅ Import Cart context
import IntroAnimation from "./components/IntroAnimation";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess"; // ✅ add this

// slick CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./styles/Slick.css";
import "./index.css";

function AppWrapper() {
  const [successMessage, setSuccessMessage] = useState("");
  const { user } = useUser();
  const isAdmin = user && user.id === ADMIN_ID;
  const location = useLocation();

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(""), 2500);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  return (
    <>
      {/* ✅ Intro animation */}
      <IntroAnimation />

      {successMessage && <div className="success-message">{successMessage}</div>}

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route
          path="/login"
          element={<Login setSuccessMessage={setSuccessMessage} />}
        />
        <Route
          path="/register"
          element={<Register setSuccessMessage={setSuccessMessage} />}
        />

        <Route path="/cart" element={<Cart />} />
        <Route path="/category" element={<Category />} />
        <Route
          path="/seller"
          element={isAdmin ? <SellerDashboard /> : <AccessDenied />}
        />
        <Route path="/contact" element={<Contact />} />
        <Route path="/orders" element={<Orders />} />
         <Route path="/checkout" element={<Checkout />} />
 <Route path="/order-success" element={<OrderSuccess />} />  {/* ✅ NEW LINE */}

      </Routes>

      <Footer />
    </>
  );
}

function App() {
  return (
    // ✅ Wrap everything in CartProvider
    <CartProvider>
      <AppWrapper />
    </CartProvider>
  );
}

export default App;
