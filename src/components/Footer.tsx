import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa"
import "../styles/Footer.css"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>TKD Fast</h3>
            <p>The premier platform for Taekwondo tournament management and registration.</p>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebook />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                <FaYoutube />
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/about">About</a>
              </li>
              <li>
                <a href="/tournaments">Tournaments</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Contact Us</h3>
            <p>Email: info@tkdfast.com</p>
            <p>Phone: +1 (123) 456-7890</p>
            <p>Address: 123 Martial Arts St, Dojang City</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} TKD Fast. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
