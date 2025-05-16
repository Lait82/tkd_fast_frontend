"use client"

import { useState, type FormEvent } from "react"
import { Link } from "react-router-dom"
import { FaEnvelope, FaLock, FaExclamationTriangle } from "react-icons/fa"
import { useAuth } from "../context/AuthContext"
import Header from "../components/Header"
import Footer from "../components/Footer"
import "../styles/Auth.css"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [formErrors, setFormErrors] = useState<{ email?: string; password?: string }>({})

  const { login, loading, error } = useAuth()

  const validateForm = () => {
    const errors: { email?: string; password?: string } = {}
    let isValid = true

    if (!email) {
      errors.email = "Email is required"
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid"
      isValid = false
    }

    if (!password) {
      errors.password = "Password is required"
      isValid = false
    }

    setFormErrors(errors)
    return isValid
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      await login(email, password)
    }
  }

  return (
    <div className="auth-page">
      <Header />

      <main className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1>Welcome Back</h1>
            <p>Sign in to your account to continue</p>
          </div>

          {error && (
            <div className="auth-error">
              <FaExclamationTriangle />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <div className="input-group">
                <span className="input-icon">
                  <FaEnvelope />
                </span>
                <input
                  type="email"
                  id="email"
                  className={`form-input ${formErrors.email ? "input-error" : ""}`}
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>
              {formErrors.email && <div className="form-error">{formErrors.email}</div>}
            </div>

            <div className="form-group">
              <div className="password-header">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <Link to="/forgot-password" className="forgot-password">
                  Forgot Password?
                </Link>
              </div>
              <div className="input-group">
                <span className="input-icon">
                  <FaLock />
                </span>
                <input
                  type="password"
                  id="password"
                  className={`form-input ${formErrors.password ? "input-error" : ""}`}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
              </div>
              {formErrors.password && <div className="form-error">{formErrors.password}</div>}
            </div>

            <button type="submit" className="btn-base btn-primary w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Don't have an account?{" "}
              <Link to="/signup" className="auth-link">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Login
