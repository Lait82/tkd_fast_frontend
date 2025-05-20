"use client"

import type React from "react"

import { FaUser, FaEnvelope, FaPhone, FaCalendarAlt } from "react-icons/fa"
import { useSignupForm } from "../../context/SignupFormContext"
import FormInput from "@/components/forms/FormInput"
import Button from "@/components/Button"

const StepOne = () => {
  const { formData, updateFormData, goToNextStep, errors, loading } = useSignupForm()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    updateFormData({ [name]: value })
  }

  return (
    <>
      <div className="form-row">
        <FormInput
          label="Nombre"
          name="firstname"
          icon={<FaUser />}
          value={formData.firstname}
          onChange={handleChange}
          error={errors.firstname}
          disabled={loading}
          placeholder="Nombre"
        />

        <FormInput
          label="Apellido"
          name="lastname"
          icon={<FaUser />}
          value={formData.lastname}
          onChange={handleChange}
          error={errors.lastname}
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
        error={errors.email}
        disabled={loading}
        placeholder="Email"
      />

      <FormInput
        label="Teléfono"
        name="phone"
        icon={<FaPhone />}
        value={formData.phone}
        onChange={handleChange}
        error={errors.phone}
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
        error={errors.dob}
        disabled={loading}
      />

      <Button
        type="button"
        className="btn-primary w-full font-bold justify-center"
        onClick={goToNextStep}
        disabled={loading}
        style={{ marginTop: "2rem" }}
      >
        Siguiente
      </Button>
    </>
  )
}

export default StepOne
