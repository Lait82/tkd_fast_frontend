"use client"

import type { FormEvent } from "react"
import { Link } from "react-router-dom"
import { FaExclamationTriangle } from "react-icons/fa"
import { useAuth } from "../context/AuthContext"
import Header from "../components/Header"
import Footer from "../components/Footer"
import "../styles/Auth.css"
import { SignupFormProvider, useSignupForm } from "../context/SignupFormContext"
import StepOne from "@/components/signup/StepOne"
import StepTwo from "@/components/signup/StepTwo"
import StepThree from "@/components/signup/StepThree"

// Wrapper component that provides the context
const SignupWithProvider = () => {
  const { signup, loading, error } = useAuth()

  const handleSubmit = async (formData: any) => {
    // Format date from yyyy-mm-dd to dd-mm-yyyy
    const formattedData = { ...formData }
    if (formData.dob) {
      const [year, month, day] = formData.dob.split("-")
      formattedData.dob = `${day}-${month}-${year}`
    }

    await signup(formattedData)
  }

  return (
    <SignupFormProvider loading={loading}>
      <SignupContent onSubmit={handleSubmit} error={error} />
    </SignupFormProvider>
  )
}

// Main component that uses the context
interface SignupContentProps {
  onSubmit: (formData: any) => Promise<void>
  error: string | null
}

const SignupContent = ({ onSubmit, error }: SignupContentProps) => {
  const { formData, currentStep, validateCurrentStep } = useSignupForm()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (currentStep === 3 && validateCurrentStep()) {
      await onSubmit(formData)
    }
  }

  return (
    <div className="auth-page">
      <Header />
      <main className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1>Creá tu cuenta</h1>
            <p>
              Unite a <span className="text-logo">TKD Fast</span> para inscribirte en torneos y más
            </p>
          </div>

          {error && (
            <div className="auth-error">
              <FaExclamationTriangle />
              <span>{error}</span>
            </div>
          )}

          <div className="signup-progress">
            <div className={`progress-step ${currentStep >= 1 ? "active" : ""}`}>1</div>
            <div className={`progress-line ${currentStep >= 2 ? "progress-done" : ""}`}></div>
            <div className={`progress-step ${currentStep >= 2 ? "active" : ""}`}>2</div>
            <div className={`progress-line ${currentStep >= 3 ? "progress-done" : ""}`}></div>
            <div className={`progress-step ${currentStep >= 3 ? "active" : ""}`}>3</div>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {currentStep === 1 && <StepOne />}
            {currentStep === 2 && <StepTwo />}
            {currentStep === 3 && <StepThree />}
          </form>

          <div className="auth-footer">
            <p>
              ¿Ya tenés una cuenta?{" "}
              <Link to="/login" className="auth-link">
                Iniciá sesión
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default SignupWithProvider
