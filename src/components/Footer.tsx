import "../styles/Footer.css"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <img src="/logo.png" alt="TKD Fast" className="mb-8 logo-img mb-5" />
            <p className="text-muted"> Organizá. Inscribite. Competí. Todo en un solo lugar.</p>
            {/* <div className="social-icons">
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
            </div> */}
          </div>

          <div className="footer-section">
            <h3>Enlaces Rápidos</h3>
            <ul className="footer-links">
              <li>
                <a className="yellow" href="/">{">  Inicio"}</a>
              </li>
              <li>
                <a className="green" href="/about">{">  Nosotros"}</a>
              </li>
              <li>
                <a className="blue" href="/tournaments">{">  Torneos"}</a>
              </li>
              <li>
                <a className="red" href="/contact">{">  Contacto"}</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Contáctanos</h3>
            <p>Email: manuexposito82@outlook.com</p>
            <p>Phone: +54 2246 438109</p>
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
