"use client"

import type React from "react"

import { useState, type FormEvent } from "react"
import { Link } from "react-router-dom"
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaIdCard,
  FaSchool,
  FaCalendarAlt,
  FaLock,
  FaExclamationTriangle,
} from "react-icons/fa"
import { ArrowRight } from "lucide-react"
import { useAuth } from "../context/AuthContext"
import Header from "../components/Header"
import Footer from "../components/Footer"
import "../styles/Auth.css"
import FormInput from "@/components/forms/FormInput"
import Button from "@/components/Button"

const rankOptions = [
  { value: "WHITE", label: "White Belt" },
  { value: "YELLOW", label: "Yellow Belt" },
  { value: "GREEN", label: "Green Belt" },
  { value: "BLUE", label: "Blue Belt" },
  { value: "RED", label: "Red Belt" },
  { value: "BLACK", label: "Black Belt" },
  { value: "DAN_1", label: "1st Dan" },
  { value: "DAN_2", label: "2nd Dan" },
  { value: "DAN_3", label: "3rd Dan" },
  { value: "DAN_4", label: "4th Dan" },
  { value: "DAN_5", label: "5th Dan" },
]

const federationOptions = [
  { value: "FATI", label: "FATI" },
  { value: "ITF", label: "ITF" },
  { value: "WTF", label: "WTF" },
]

const Signup = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    rank: "DAN_2",
    school: "",
    id_number: "",
    password: "",
    password_confirmation: "",
    asociation: "ATRA",
    federation: "FATI",
    dob: "",
    invite_token: "",
  })

  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [step, setStep] = useState(1)
  const { signup, loading, error } = useAuth()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const validateStep1 = () => {
    const errors: Record<string, string> = {}
    let isValid = true

    if (!formData.firstname) {
      errors.firstname = "First name is required"
      isValid = false
    }

    if (!formData.lastname) {
      errors.lastname = "Last name is required"
      isValid = false
    }

    if (!formData.email) {
      errors.email = "Email is required"
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid"
      isValid = false
    }

    if (!formData.phone) {
      errors.phone = "Phone number is required"
      isValid = false
    }

    if (!formData.dob) {
      errors.dob = "Date of birth is required"
      isValid = false
    }

    setFormErrors(errors)
    return isValid
  }

  const validateStep2 = () => {
    const errors: Record<string, string> = {}
    let isValid = true

    if (!formData.id_number) {
      errors.id_number = "ID number is required"
      isValid = false
    }

    if (!formData.school) {
      errors.school = "School is required"
      isValid = false
    }

    setFormErrors(errors)
    return isValid
  }

  const validateStep3 = () => {
    const errors: Record<string, string> = {}
    let isValid = true

    if (!formData.password) {
      errors.password = "Password is required"
      isValid = false
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters"
      isValid = false
    }

    if (!formData.password_confirmation) {
      errors.password_confirmation = "Please confirm your password"
      isValid = false
    } else if (formData.password !== formData.password_confirmation) {
      errors.password_confirmation = "Passwords do not match"
      isValid = false
    }

    setFormErrors(errors)
    return isValid
  }

  const nextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2)
    } else if (step === 2 && validateStep2()) {
      setStep(3)
    }
  }

  const prevStep = () => {
    setStep(step - 1)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (step === 3 && validateStep3()) {
      // Format date from yyyy-mm-dd to dd-mm-yyyy
      const formattedData = { ...formData }
      if (formData.dob) {
        const [year, month, day] = formData.dob.split("-")
        formattedData.dob = `${day}-${month}-${year}`
      }

      await signup(formattedData)
    }
  }

  return (
    <div className="auth-page">
      <Header />

      <main className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1>Create Your Account</h1>
            <p>Join TKD Fast to register for tournaments and more</p>
          </div>

          {error && (
            <div className="auth-error">
              <FaExclamationTriangle />
              <span>{error}</span>
            </div>
          )}

          <div className="signup-progress">
            <div className={`progress-step ${step >= 1 ? "active" : ""}`}>1</div>
            <div className="progress-line"></div>
            <div className={`progress-step ${step >= 2 ? "active" : ""}`}>2</div>
            <div className="progress-line"></div>
            <div className={`progress-step ${step >= 3 ? "active" : ""}`}>3</div>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {step === 1 && (
              <>
                <div className="form-row">
                <FormInput
                  label="First Name"
                  name="firstname"
                  icon={<FaUser />}
                  value={formData.firstname}
                  onChange={handleChange}
                  error={formErrors.firstname}
                  disabled={loading}
                  placeholder="Enter your first name"
                />
                  {/* <div className="form-group">
                    <label htmlFor="firstname" className="form-label">
                      First Name
                    </label>
                    <div className="input-group">
                      <span className="input-icon">
                        <FaUser />
                      </span>
                      <input
                        type="text"
                        id="firstname"
                        name="firstname"
                        className={`form-input ${formErrors.firstname ? "input-error" : ""}`}
                        placeholder="Enter your first name"
                        value={formData.firstname}
                        onChange={handleChange}
                        disabled={loading}
                      />
                    </div>
                    {formErrors.firstname && <div className="form-error">{formErrors.firstname}</div>}
                  </div> */}

                  <div className="form-group">
                    <label htmlFor="lastname" className="form-label">
                      Last Name
                    </label>
                    <div className="input-group">
                      <span className="input-icon">
                        <FaUser />
                      </span>
                      <input
                        type="text"
                        id="lastname"
                        name="lastname"
                        className={`form-input ${formErrors.lastname ? "input-error" : ""}`}
                        placeholder="Enter your last name"
                        value={formData.lastname}
                        onChange={handleChange}
                        disabled={loading}
                      />
                    </div>
                    {formErrors.lastname && <div className="form-error">{formErrors.lastname}</div>}
                  </div>
                </div>

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
                      name="email"
                      className={`form-input ${formErrors.email ? "input-error" : ""}`}
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </div>
                  {formErrors.email && <div className="form-error">{formErrors.email}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="phone" className="form-label">
                    Phone Number
                  </label>
                  <div className="input-group">
                    <span className="input-icon">
                      <FaPhone />
                    </span>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className={`form-input ${formErrors.phone ? "input-error" : ""}`}
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </div>
                  {formErrors.phone && <div className="form-error">{formErrors.phone}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="dob" className="form-label">
                    Date of Birth
                  </label>
                  <div className="input-group">
                    <span className="input-icon">
                      <FaCalendarAlt />
                    </span>
                    <input
                      type="date"
                      id="dob"
                      name="dob"
                      className={`form-input ${formErrors.dob ? "input-error" : ""}`}
                      value={formData.dob}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </div>
                  {formErrors.dob && <div className="form-error">{formErrors.dob}</div>}
                </div>

                <Button type="button"
                  iconRight={<ArrowRight />}
                  className="btn-primary w-full font-bold" 
                  onClick={nextStep} 
                  disabled={loading}
                >
                  Next
                </Button>
              </>
            )}

            {step === 2 && (
              <>
                <div className="form-group">
                  <label htmlFor="id_number" className="form-label">
                    ID Number
                  </label>
                  <div className="input-group">
                    <span className="input-icon">
                      <FaIdCard />
                    </span>
                    <input
                      type="text"
                      id="id_number"
                      name="id_number"
                      className={`form-input ${formErrors.id_number ? "input-error" : ""}`}
                      placeholder="Enter your ID number"
                      value={formData.id_number}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </div>
                  {formErrors.id_number && <div className="form-error">{formErrors.id_number}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="school" className="form-label">
                    School
                  </label>
                  <div className="input-group">
                    <span className="input-icon">
                      <FaSchool />
                    </span>
                    <input
                      type="text"
                      id="school"
                      name="school"
                      className={`form-input ${formErrors.school ? "input-error" : ""}`}
                      placeholder="Enter your school"
                      value={formData.school}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </div>
                  {formErrors.school && <div className="form-error">{formErrors.school}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="rank" className="form-label">
                    Rank
                  </label>
                  <select
                    id="rank"
                    name="rank"
                    className="form-input"
                    value={formData.rank}
                    onChange={handleChange}
                    disabled={loading}
                  >
                    {rankOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="federation" className="form-label">
                    Federation
                  </label>
                  <select
                    id="federation"
                    name="federation"
                    className="form-input"
                    value={formData.federation}
                    onChange={handleChange}
                    disabled={loading}
                  >
                    {federationOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="asociation" className="form-label">
                    Association
                  </label>
                  <input
                    type="text"
                    id="asociation"
                    name="asociation"
                    className="form-input"
                    placeholder="Enter your association"
                    value={formData.asociation}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>

                <div className="form-buttons">
                  <button type="button" className="btn-secondary" onClick={prevStep} disabled={loading}>
                    Back
                  </button>
                  <button type="button" className="btn-primary" onClick={nextStep} disabled={loading}>
                    Next
                  </button>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div className="form-group">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <div className="input-group">
                    <span className="input-icon">
                      <FaLock />
                    </span>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className={`form-input ${formErrors.password ? "input-error" : ""}`}
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </div>
                  {formErrors.password && <div className="form-error">{formErrors.password}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="password_confirmation" className="form-label">
                    Confirm Password
                  </label>
                  <div className="input-group">
                    <span className="input-icon">
                      <FaLock />
                    </span>
                    <input
                      type="password"
                      id="password_confirmation"
                      name="password_confirmation"
                      className={`form-input ${formErrors.password_confirmation ? "input-error" : ""}`}
                      placeholder="Confirm your password"
                      value={formData.password_confirmation}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </div>
                  {formErrors.password_confirmation && (
                    <div className="form-error">{formErrors.password_confirmation}</div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="invite_token" className="form-label">
                    Invitation Token (Optional)
                  </label>
                  <input
                    type="text"
                    id="invite_token"
                    name="invite_token"
                    className="form-input"
                    placeholder="Enter invitation token if you have one"
                    value={formData.invite_token}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>

                <div className="form-buttons">
                  <button type="button" className="btn-secondary" onClick={prevStep} disabled={loading}>
                    Back
                  </button>
                  <button type="submit" className="btn-primary" disabled={loading}>
                    {loading ? "Creating Account..." : "Create Account"}
                  </button>
                </div>
              </>
            )}
          </form>

          <div className="auth-footer">
            <p>
              Already have an account?{" "}
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

export default Signup
