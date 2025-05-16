"use client"

import { useState, type FormEvent } from "react"
import { Link } from "react-router-dom"
import { FaEnvelope, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa"
import { forgotPassword } from "../services/authService"
import Header from "../components/Header"
import Footer from "../components/Footer"
import "../styles/Auth.css"

const ForgotPassword = () => {
  const [email, setEmail] = useState("")
  const [formError, setFormError] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const validateForm = () => {
    if (!email) {
      setFormError("Email is required")
      return false
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setFormError("Email is invalid")
      return false
    }

    setFormError("")
    return true
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      setLoading(true)
      setError("")

      try {
        await forgotPassword(email)
        setSuccess(true)
      } catch (err: any) {
        setError(err.message || "Failed to send password reset email")
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <div className="auth-page">
      <Header />

      <main className="auth-container">
        <div className="auth-card">
          {!success ? (
            <>
              <div className="auth-header">
                <h1>Forgot Password</h1>
                <p>Enter your email to reset your password</p>
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
                      className={`form-input ${formError ? "input-error" : ""}`}
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                  {formError && <div className="form-error">{formError}</div>}
                </div>

                <button type="submit" className="btn-primary w-full" disabled={loading}>
                  {loading ? "Sending..." : "Reset Password"}
                </button>
              </form>
            </>
          ) : (
            <div className="auth-success">
              <FaCheckCircle className="success-icon" />
              <h2>Email Sent</h2>
              <p>
                We've sent a password reset link to <strong>{email}</strong>. Please check your email and follow the
                instructions to reset your password.
              </p>
            </div>
          )}

          <div className="auth-footer">
            <p>
              Remember your password?{" "}
              <Link to="/login" className="auth-link">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default ForgotPassword
