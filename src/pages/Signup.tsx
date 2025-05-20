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
  FaExclamationTriangle
} from "react-icons/fa"
import { useAuth } from "../context/AuthContext"
import Header from "../components/Header"
import Footer from "../components/Footer"
import "../styles/Auth.css"
import FormInput from "@/components/forms/FormInput"
import Button from "@/components/Button"
import BeltIcon from "@/components/BeltIcon"
import { Rank } from "@/types/enums"
import { TbUsersGroup } from "react-icons/tb"

const rankOptions = [
  { value: "WHITE", label: "Blanco" },
  { value: "WHITE_YELLOW", label: "Blanco Punta Amarilla" },
  { value: "YELLOW", label: "Amarillo" },
  { value: "YELLOW_GREEN", label: "Amarillo Punta Verde" },
  { value: "GREEN", label: "Verde" },
  { value: "GREEN_BLUE", label: "Verde Punta Azul" },
  { value: "BLUE", label: "Azul" },
  { value: "BLUE_RED", label: "Azul Punta Roja" },
  { value: "RED", label: "Rojo" },
  { value: "RED_BLACK", label: "Rojo Punta Negra" },
  { value: "DAN_1", label: "1er Dan" },
  { value: "DAN_2", label: "2do Dan" },
  { value: "DAN_3", label: "3er Dan" },
  { value: "DAN_4", label: "4to Dan" },
  { value: "DAN_5", label: "5to Dan" },
  { value: "DAN_6", label: "6to Dan" }
]

const federationOptions = [
  { value: "FATI", label: "FATI" },
  { value: "FETRA", label: "FeTRA" },
  // { value: "ITF", label: "ITF" },
  // { value: "WTF", label: "WTF" },
]

const Signup = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    rank: "WHITE",
    school: "",
    id_number: "",
    password: "",
    password_confirmation: "",
    asociation: "",
    federation: "",
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
      errors.firstname = "El nombre es requerido"
      isValid = false
    }

    if (!formData.lastname) {
      errors.lastname = "El apellido es requerido"
      isValid = false
    }

    if (!formData.email) {
      errors.email = "El email es requerido"
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "El email es invalido"
      isValid = false
    }

    if (!formData.phone) {
      errors.phone = "El número de teléfono es requerido"
      isValid = false
    }

    if (!formData.dob) {
      errors.dob = "La fecha de nacimiento es requerida"
      isValid = false
    }

    setFormErrors(errors)
    return isValid
  }

  const validateStep2 = () => {
    const errors: Record<string, string> = {}
    let isValid = true

    if (!formData.id_number) {
      errors.id_number = "El DNI es requerido"
      isValid = false
    }

    if (!formData.school) {
      errors.school = "La escuela es requerida"
      isValid = false
    }

    setFormErrors(errors)
    return isValid
  }

  const validateStep3 = () => {
    const errors: Record<string, string> = {}
    let isValid = true

    if (!formData.password) {
      errors.password = "La contraseña es requerida"
      isValid = false
    } else if (formData.password.length < 8) {
      errors.password = "La contraseña debe tener al menos 8 caracteres"
      isValid = false
    }

    if (!formData.password_confirmation) {
      errors.password_confirmation = "Por favor, confirma tu contraseña"
      isValid = false
    } else if (formData.password !== formData.password_confirmation) {
      errors.password_confirmation = "Las contraseñas no coinciden"
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
            <h1>Creá tu cuenta</h1>
            <p>Unite a <span className="text-logo">TKD Fast</span> para inscribirte en torneos y más</p>
          </div>

          {error && (
            <div className="auth-error">
              <FaExclamationTriangle />
              <span>{error}</span>
            </div>
          )}

          <div className="signup-progress">
            <div className={`progress-step ${step >= 1 ? "active" : ""}`}>1</div>
            <div className={`progress-line ${step >= 2 ? "progress-done" : ""}`}></div>
            <div className={`progress-step ${step >= 2 ? "active" : ""}`}>2</div>
            <div className={`progress-line ${step >= 3 ? "progress-done" : ""}`}></div>
            <div className={`progress-step ${step >= 3 ? "active" : ""}`}>3</div>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {step === 1 && (
              <>
                <div className="form-row">
                  <FormInput
                    label="Nombre"
                    name="firstname"
                    icon={<FaUser />}
                    value={formData.firstname}
                    onChange={handleChange}
                    error={formErrors.firstname}
                    disabled={loading}
                    placeholder="Nombre"
                  />

                  <FormInput
                    label="Apellido"
                    name="lastname"
                    icon={<FaUser />}
                    value={formData.lastname}
                    onChange={handleChange}
                    error={formErrors.lastname}
                    disabled={loading}
                    placeholder="Apellido"
                  />
                </div>

                <FormInput
                  label="Correo electrónico"
                  name="email"
                  icon={<FaEnvelope />}
                  value={formData.email}
                  onChange={handleChange}
                  error={formErrors.email}
                  disabled={loading}
                  placeholder="Email"
                />

                <FormInput
                  label="Teléfono"
                  name="phone"
                  icon={<FaPhone />}
                  value={formData.phone}
                  onChange={handleChange}
                  error={formErrors.phone}
                  disabled={loading}
                  placeholder="Teléfono"
                />

                <FormInput
                  label="Fecha de nacimiento"
                  name="dob"
                  type="date"
                  icon={<FaCalendarAlt />}
                  value={formData.dob}
                  onChange={handleChange}
                  error={formErrors.dob}
                  disabled={loading}
                />

                <Button
                  type="button"
                  className="btn-primary w-full font-bold justify-center"
                  onClick={nextStep}
                  disabled={loading}
                  style={{marginTop:'2rem'}}
                >
                  Siguiente
                </Button>
              </>
            )}

            {step === 2 && (
              <>
                <FormInput
                  label="DNI"
                  name="id_number"
                  icon={<FaIdCard />}
                  value={formData.id_number}
                  onChange={handleChange}
                  error={formErrors.id_number}
                  disabled={loading}
                  placeholder="DNI"
                />

                <FormInput
                  label="Escuela"
                  name="school"
                  icon={<FaSchool />}
                  value={formData.school}
                  onChange={handleChange}
                  error={formErrors.school}
                  disabled={loading}
                  placeholder="Escuela"
                />


                <div className="form-group">
                  <label htmlFor="rank" className="form-label">
                    Grado
                  </label>

                  <div className="relative">
                    <div style={{left:4}} className="absolute top-1/2 -translate-y-1/2 pointer-events-none">
                      <BeltIcon rank={formData.rank as Rank} />
                    </div>

                    <select
                      id="rank"
                      name="rank"
                      className="form-input pl-10" // espacio a la izquierda para el ícono
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
                </div>
                {/* <RankSelect onChange={handleChange} /> */}

                <div className="form-group">
                  <label htmlFor="federation" className="form-label">Federación</label>
                  <select
                    id="federation"
                    name="federation"
                    className="form-input"
                    value={formData.federation}
                    onChange={handleChange}
                    disabled={loading}
                    style={{paddingLeft:"1rem"}}
                  >
                    {federationOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <FormInput
                  label="Asociación"
                  name="asociation"
                  icon={<TbUsersGroup />}
                  value={formData.asociation}
                  onChange={handleChange}
                  disabled={loading}
                  placeholder="Asociación: Ej: ATRA, APAT, etc.."
                />

                <div className="form-buttons">
                  <Button variant="secondary" onClick={prevStep} disabled={loading}>
                    Atrás
                  </Button>
                  <Button  onClick={nextStep} disabled={loading}>
                    Siguiente
                  </Button>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <FormInput
                  label="Contraseña"
                  name="password"
                  type="password"
                  icon={<FaLock />}
                  value={formData.password}
                  onChange={handleChange}
                  error={formErrors.password}
                  disabled={loading}
                  placeholder="Contraseña"
                />

                <FormInput
                  label="Confirmá tu contraseña"
                  name="password_confirmation"
                  type="password"
                  icon={<FaLock />}
                  value={formData.password_confirmation}
                  onChange={handleChange}
                  error={formErrors.password_confirmation}
                  disabled={loading}
                  placeholder="Confirmación de contraseña"
                />

                {/* <FormInput
                  label="Token de invitación (opcional)"
                  name="invite_token"
                  value={formData.invite_token}
                  icon={<FaTag />}
                  onChange={handleChange}
                  disabled={loading}
                  placeholder="Si tenés un código de invitación, ingresalo acá"
                /> */}

                <div className="form-buttons">
                  <Button variant="secondary" onClick={prevStep} disabled={loading}>
                    Atrás
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? "Creando cuenta..." : "Crear cuenta"}
                  </Button>
                </div>
              </>
            )}
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

export default Signup
