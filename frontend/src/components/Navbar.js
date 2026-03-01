import React from "react";
import { Link } from "react-router-dom";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
  useUser,
} from "@clerk/clerk-react";
import "../index.css";

function Navbar() {
  const { user } = useUser();

  return (
    <nav className="navbar">
      <div className="logo">𝐄𝐥𝐞𝐜𝐭𝐫𝐨𝐬𝐭𝐨𝐫𝐞</div>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/shop">Shop</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/seller">Seller Dashboard</Link></li>
      </ul>

      <div className="search-bar">
        <input type="text" placeholder="Search products..." />
        <button>🔍</button>
      </div>

      {/* CART WITH DROPDOWN */}
      <div className="cart-menu">
        <FaShoppingCart className="cart-icon" />
        <div className="cart-dropdown">
          <Link to="/cart">My Cart</Link>
          <Link to="/orders">My Orders</Link>
        </div>
      </div>

      <div className="account">
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>

        <SignedOut>
          <SignInButton mode="modal">
            <button className="account-link">
              <FaUser className="account-icon" />
              <span>Account</span>
            </button>
          </SignInButton>
        </SignedOut>
      </div>
    </nav>
  );
}

export default Navbar;
