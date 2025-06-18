import { Phone } from "lucide-react";
import "../styles/Footer.css";
import { FaEnvelope } from "react-icons/fa";

const Footer = () => {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="footer" id="footer">
			<div className="container">
				<div className="footer-content">
					<div className="footer-section">
						<img
							src="/logo.png"
							alt="TKDFast"
							className="mb-8 logo-img mb-5"
						/>
						<p className="text-muted">
							{" "}
							Organizá. Inscribite. Competí. Todo en un solo
							lugar.
						</p>
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
								<a className="yellow" href="/">
									{">  Inicio"}
								</a>
							</li>
							<li>
								<a className="green" href="/about">
									{">  Nosotros"}
								</a>
							</li>
							{/* <li>
								<a className="blue" href="/tournaments">
									{">  Torneos"}
								</a>
							</li>
							<li>
								<a className="red" href="/contact">
									{">  Contacto"}
								</a>
							</li> */}
						</ul>
					</div>

					<div className="footer-section">
						<h3>Contáctanos</h3>
						<a href="mailto:manuexposito82@outlook.com">
							<p className="flex gap-1 transition-all ease-fluid hover:text-orange">
								<FaEnvelope size={22} />
								manuexposito82@outlook.com
							</p>
						</a>
						<a href="tel:+542246438109">
							<p className="flex gap-1 transition-all ease-fluid hover:text-orange">
								<Phone />
								Teléfono: +54 2246 438109
							</p>
						</a>
					</div>
				</div>

				<div className="footer-bottom">
					<p>
						&copy; {currentYear}{" "}
						<span className="text-logo">TKDFast</span>. All rights
						reserved.
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
