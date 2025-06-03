"use client"

import type React from "react"

import { FaIdCard, FaSchool } from "react-icons/fa"
import { TbUsersGroup } from "react-icons/tb"
import { useSignupForm } from "../../context/SignupFormContext"
import FormInput from "@/components/forms/FormInput"
import Button from "@/components/Button"
import BeltIcon from "@/components/BeltIcon"
import type { Rank } from "@/types/enums"

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
  { value: "DAN_6", label: "6to Dan" },
]

const federationOptions = [
  { value: "FATI", label: "FATI" },
  { value: "FETRA", label: "FeTRA" },
  // { value: "ITF", label: "ITF" },
  // { value: "WTF", label: "WTF" },
]

const StepTwo = () => {
  const { formData, updateFormData, goToNextStep, goToPreviousStep, errors, loading } = useSignupForm()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    updateFormData({ [name]: value })
  }

  return (
    <>
      <FormInput
        label="DNI"
        name="id_number"
        icon={<FaIdCard />}
        value={formData.id_number}
        onChange={handleChange}
        error={errors.id_number}
        disabled={loading}
        placeholder="DNI"
      />

      <FormInput
        label="Escuela"
        name="school"
        icon={<FaSchool />}
        value={formData.school}
        onChange={handleChange}
        error={errors.school}
        disabled={loading}
        placeholder="Escuela"
      />

      <div className="form-group">
        <label htmlFor="rank" className="form-label">
          Grado
        </label>

        <div className="relative">
          <div style={{ left: 4 }} className="absolute top-1/2 -translate-y-1/2 pointer-events-none">
            <BeltIcon rank={formData.rank as Rank} />
          </div>

          <select
            id="rank"
            name="rank"
            className="form-input-primary pl-10" // espacio a la izquierda para el ícono
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

      <div className="form-group">
        <label htmlFor="federation" className="form-label">
          Federación
        </label>
        <select
          id="federation"
          name="federation"
          className="form-input-primary"
          value={formData.federation}
          onChange={handleChange}
          disabled={loading}
          style={{ paddingLeft: "1rem" }}
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
        <Button variant="secondary" onClick={goToPreviousStep} disabled={loading}>
          Atrás
        </Button>
        <Button onClick={goToNextStep} disabled={loading}>
          Siguiente
        </Button>
      </div>
    </>
  )
}

export default StepTwo
