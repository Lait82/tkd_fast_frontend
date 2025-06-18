import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
// import { useAuth } from "../context/AuthContext"
// import { User, LogIn } from "lucide-react";
import "../styles/Header.css";
// import ButtonLink from "./ButtonLink";
import Button from "./Button";
// import { useAuthStore } from "@/states/useAuthStore";

const Header = () => {
	const [isOpen, setIsOpen] = useState(false);
	// const { isAuthenticated, logout } = useAuthStore();

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	return (
		<header className="header">
			<div className="header-container">
				<Link to="/" className="logo">
					<img src="/logo.png" alt="TKD Fast" className="logo-img" />
				</Link>

				<div className="mobile-toggle" onClick={toggleMenu}>
					{isOpen ? <FaTimes /> : <FaBars />}
				</div>

				<nav className={`nav ${isOpen ? "nav-open" : ""}`}>
					<ul className="nav-list">
						<li className="nav-item">
							<Link
								to="/"
								className="nav-link"
								onClick={() => setIsOpen(false)}
							>
								Inicio
							</Link>
						</li>
						<li className="nav-item">
							<Link
								to="/about"
								className="nav-link nav-link-green"
								onClick={() => setIsOpen(false)}
							>
								Nosotros
							</Link>
						</li>
						{/* <li className="nav-item">
							<Link
								to="/tournaments"
								className="nav-link nav-link-blue"
								onClick={() => setIsOpen(false)}
							>
								Torneos
							</Link>
						</li>
						<li className="nav-item">
							<Link
								to="#footer"
								className="nav-link nav-link-red"
								onClick={() => setIsOpen(false)}
							>
								Contacto
							</Link>
						</li> */}
					</ul>
				</nav>

				<div className="auth-buttons">
					<Button variant="primary" disabled={true}>
						Próximamente
					</Button>
					{/* {isAuthenticated ? (
						<Button variant="secondary" onClick={logout}>
							Cerrar Sesión
						</Button>
					) : (
						<>
							<ButtonLink
								to="/login"
								variant="secondary"
								iconLeft={<LogIn size={22} />}
								className="btn-base btn-secondary"
								onClick={() => setIsOpen(false)}
							>
								Inicia Sesión
							</ButtonLink>
							<ButtonLink
								to="/signup"
								className="btn-base btn-primary"
								onClick={() => setIsOpen(false)}
								iconLeft={<User size={22} />}
							>
								Regístrate
							</ButtonLink>
						</>
					)} */}
				</div>
			</div>
		</header>
	);
};

export default Header;
