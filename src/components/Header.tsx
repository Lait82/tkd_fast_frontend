"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { FaBars, FaTimes } from "react-icons/fa"
import { useAuth } from "../context/AuthContext"
import {User, LogIn} from "lucide-react"
import "../styles/Header.css"
import ButtonLink from "./ButtonLink"

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { isAuthenticated, logout } = useAuth()

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <header className="header">
      <div className="container header-container">
        <Link to="/" className="logo">
          <img src="/logo.png" alt="TKD Fast" className="logo-img" />
        </Link>

        <div className="mobile-toggle" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>

        <nav className={`nav ${isOpen ? "nav-open" : ""}`}>
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/" className="nav-link" onClick={() => setIsOpen(false)}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link" onClick={() => setIsOpen(false)}>
                About
              </Link>
            </li>
            <li className="nav-item">
                <Link to="/tournaments" className="nav-link" onClick={() => setIsOpen(false)}>
                  Tournaments
                </Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link" onClick={() => setIsOpen(false)}>
                Contact
              </Link>
            </li>
          </ul>

          <div className="auth-buttons">
            {isAuthenticated ? (
              <button className="btn-secondary" onClick={logout}>
                Logout
              </button>
            ) : (
              <>
                <ButtonLink 
                  to="/login" 
                  variant="secondary"
                  iconLeft={<LogIn size={22} />}
                  className="btn-base btn-secondary" 
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </ButtonLink>
                <ButtonLink 
                  to="/signup" 
                  className="btn-base btn-primary" 
                  onClick={() => setIsOpen(false)}
                  iconLeft={<User size={22} />}
                  >
                  Sign Up
                </ButtonLink>


              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header
