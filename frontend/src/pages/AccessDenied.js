import React from "react";
import { Link } from "react-router-dom";

function AccessDenied() {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>🚫 Access Denied</h1>
      <p>You are not authorized to view this page.</p>
      <Link to="/" style={{ color: "blue", textDecoration: "underline" }}>
        Go Back to Home
      </Link>
    </div>
  );
}

export default AccessDenied;
