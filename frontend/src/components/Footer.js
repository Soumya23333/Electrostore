import React from "react";

function Footer() {
  return (
    <>
      {/* ===== Footer Top Section ===== */}
      <section className="footer-top">
        <div className="container">
          <div className="footer-row">
            
            {/* Logo & About */}
            <div className="footer-col">
              <h2 className="logo">ElectroStore</h2>
              <p>
                Upgrades Your Lifestyle with ElectroStore
              </p>
            </div>

            {/* Company Links */}
            <div className="footer-col">
              <h3>Company</h3>
              <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">About us</a></li>
                <li><a href="#">Contact us</a></li>
                <li><a href="#">Privacy policy</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="footer-col">
              <h3>Get in touch</h3>
              <p>📞 +1-234-567-890</p>
              <p>📧 soumyaranjankhuntia13@gmail.com</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Bottom Footer ===== */}
      <footer className="bottom-footer">
        <p>Copyright 2025 © ElectroStore. All Rights Reserved.
</p>
      </footer>
    </>
  );
}

export default Footer;
