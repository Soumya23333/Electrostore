import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      {/* ===== Professional Footer ===== */}
      <footer className="footer-professional">
        <div className="footer-container">
          {/* Left Section - Brand */}
          <div className="footer-section footer-brand">
            <h2 className="footer-logo">⚡ ElectroStore</h2>
            <p className="footer-tagline">Your Premier Destination for Premium Electronics</p>
            <p className="footer-description">
              Discover cutting-edge technology and electronics with unbeatable prices and premium quality. 
              Shop with confidence from India's trusted electronics retailer.
            </p>
            {/* Social Links */}
            <div className="footer-social">
              <a href="#" className="social-icon" title="Facebook">f</a>
              <a href="#" className="social-icon" title="Twitter">𝕏</a>
              <a href="#" className="social-icon" title="Instagram">📷</a>
              <a href="#" className="social-icon" title="LinkedIn">in</a>
            </div>
          </div>

          {/* Middle Section - Navigation */}
          <div className="footer-section">
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-links">
              <li><a href="/" className="footer-link">🏠 Home</a></li>
              <li><a href="/shop" className="footer-link">🛍️ Shop</a></li>
              <li><a href="/contact" className="footer-link">📧 Contact Us</a></li>
              <li><a href="#" className="footer-link">❓ FAQ</a></li>
              <li><a href="#" className="footer-link">📋 Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Middle-Right Section - Customer Service */}
          <div className="footer-section">
            <h3 className="footer-heading">Customer Service</h3>
            <ul className="footer-links">
              <li><a href="#" className="footer-link">💳 Payment Options</a></li>
              <li><a href="#" className="footer-link">📦 Track Order</a></li>
              <li><a href="#" className="footer-link">↩️ Returns & Refunds</a></li>
              <li><a href="#" className="footer-link">🚚 Shipping Info</a></li>
              <li><a href="#" className="footer-link">🔒 Privacy Policy</a></li>
            </ul>
          </div>

          {/* Right Section - Contact */}
          <div className="footer-section footer-contact">
            <h3 className="footer-heading">Get in Touch</h3>
            <div className="contact-item">
              <span className="contact-icon">📞</span>
              <div>
                <p className="contact-label">Phone</p>
                <a href="tel:+919876543210" className="contact-value">+91-9876-543-210</a>
              </div>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📧</span>
              <div>
                <p className="contact-label">Email</p>
                <a href="mailto:support@electrostore.com" className="contact-value">support@electrostore.com</a>
              </div>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📍</span>
              <div>
                <p className="contact-label">Address</p>
                <p className="contact-value">123 Tech Street, Tech City, India - 110001</p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="footer-divider"></div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="footer-copyright">
              &copy; {currentYear} ElectroStore. All Rights Reserved. | Designed with ❤️ for Tech Lovers
            </p>
            <div className="footer-badges">
              <span className="badge">🔒 Secure</span>
              <span className="badge">✅ Verified</span>
              <span className="badge">🚀 Fast Delivery</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
