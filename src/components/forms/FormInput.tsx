import React from "react"
import Label from "./Label"
// import { IconType } from "react-icons"

interface FormInputProps {
  label?: string
  name: string
  type?: string
  variant?: 'primary' | 'secondary'
  icon?: React.ReactNode
  value: string
  inputClassName?: string
  containerClassName?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
  disabled?: boolean
  placeholder?: string
  required?: boolean | undefined
  horizontal?: boolean | undefined
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  type = "text",
  variant = "primary",
  icon,
  value,
  onChange,
  error,
  inputClassName = "",
  containerClassName = "",
  disabled,
  placeholder,
  required,
  horizontal
}) => {
  const horizontalClasses = horizontal ? 'flex items-end' : ''
  return (
    // <div className="form-group">
    <div className={`${containerClassName} ${horizontalClasses}`}>
      {label && <Label name={name} label={label} required={required} horizontal={horizontal} /> }
      <div className="input-group">
        {icon && <span className={`input-icon${variant === 'secondary' ? '-secondary': ''}`}>{icon}</span>}
        <input
          type={type}
          id={name}
          name={name}
          className={`form-input-${variant} ${type === 'date'? (value ? 'text-neutrallight' : 'text-muted') : ''} ${inputClassName} ${error ? "input-error" : ""}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
      </div>
      {error && <div className="form-error">{error}</div>}
    </div>
  )
}

export default FormInput