import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

const PUBLISHABLE_KEY = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  console.error("❌ Missing Clerk Publishable Key in .env file");
} else {
  console.log("✅ Clerk key loaded:", PUBLISHABLE_KEY);
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <BrowserRouter>
          <App />
      </BrowserRouter>
    </ClerkProvider>
  </React.StrictMode>
);