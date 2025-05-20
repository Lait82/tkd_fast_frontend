"use client"

import type React from "react"
import { createContext, useContext, useState, type ReactNode } from "react"

// Define the shape of your form data
interface SignupFormData {
  // Personal information
  firstname: string
  lastname: string
  email: string
  phone: string
  dob: string

  // Taekwondo information
  id_number: string
  rank: string
  school: string
  federation: string
  asociation: string

  // Account information
  password: string
  password_confirmation: string
  invite_token: string
}

// Define the context shape
interface SignupFormContextType {
  formData: SignupFormData
  updateFormData: (data: Partial<SignupFormData>) => void
  currentStep: number
  goToNextStep: () => void
  goToPreviousStep: () => void
  goToStep: (step: number) => void
  validateCurrentStep: () => boolean
  errors: Record<string, string>
  setErrors: (errors: Record<string, string>) => void
  loading: boolean
}

// Create context with default values
const SignupFormContext = createContext<SignupFormContextType | undefined>(undefined)

// Initial form data
const initialFormData: SignupFormData = {
  firstname: "",
  lastname: "",
  email: "",
  phone: "",
  dob: "",
  id_number: "",
  rank: "WHITE",
  school: "",
  federation: "FATI",
  asociation: "",
  password: "",
  password_confirmation: "",
  invite_token: "",
}

// Provider component
export const SignupFormProvider: React.FC<{ children: ReactNode; loading: boolean }> = ({ children, loading }) => {
  const [formData, setFormData] = useState<SignupFormData>(initialFormData)
  const [currentStep, setCurrentStep] = useState(1)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Update form data
  const updateFormData = (data: Partial<SignupFormData>) => {
    setFormData((prevData) => ({
      ...prevData,
      ...data,
    }))
  }

  // Navigation functions
  const goToNextStep = () => {
    if (validateCurrentStep()) {
      setCurrentStep((prev) => Math.min(3, prev + 1))
    }
  }

  const goToPreviousStep = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1))
  }

  const goToStep = (step: number) => {
    if (step >= 1 && step <= 3) {
      setCurrentStep(step)
    }
  }

  // Validation function
  const validateCurrentStep = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (currentStep === 1) {
      // Validate personal information
      if (!formData.firstname) {
        newErrors.firstname = "El nombre es requerido"
      }

      if (!formData.lastname) {
        newErrors.lastname = "El apellido es requerido"
      }

      if (!formData.email) {
        newErrors.email = "El email es requerido"
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "El email es invalido"
      }

      if (!formData.phone) {
        newErrors.phone = "El número de teléfono es requerido"
      }

      if (!formData.dob) {
        newErrors.dob = "La fecha de nacimiento es requerida"
      }
    } else if (currentStep === 2) {
      // Validate Taekwondo information
      if (!formData.id_number) {
        newErrors.id_number = "El DNI es requerido"
      }

      if (!formData.school) {
        newErrors.school = "La escuela es requerida"
      }
    } else if (currentStep === 3) {
      // Validate account information
      if (!formData.password) {
        newErrors.password = "La contraseña es requerida"
      } else if (formData.password.length < 8) {
        newErrors.password = "La contraseña debe tener al menos 8 caracteres"
      }

      if (!formData.password_confirmation) {
        newErrors.password_confirmation = "Por favor, confirma tu contraseña"
      } else if (formData.password !== formData.password_confirmation) {
        newErrors.password_confirmation = "Las contraseñas no coinciden"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  return (
    <SignupFormContext.Provider
      value={{
        formData,
        updateFormData,
        currentStep,
        goToNextStep,
        goToPreviousStep,
        goToStep,
        validateCurrentStep,
        errors,
        setErrors,
        loading,
      }}
    >
      {children}
    </SignupFormContext.Provider>
  )
}

// Custom hook for using the context
export const useSignupForm = () => {
  const context = useContext(SignupFormContext)
  if (context === undefined) {
    throw new Error("useSignupForm must be used within a SignupFormProvider")
  }
  return context
}
