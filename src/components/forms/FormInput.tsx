import React from "react"
// import { IconType } from "react-icons"

interface FormInputProps {
  label?: string
  name: string
  type?: string
  icon?: React.ReactNode
  value: string
  className?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
  disabled?: boolean
  placeholder?: string
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  type = "text",
  icon,
  value,
  onChange,
  error,
  className = "",
  disabled,
  placeholder,
}) => {
  return (
    // <div className="form-group">
    <div className="">
      {label ?? <label htmlFor={name} className="form-label">
        {label}
      </label> }
      <div className="input-group">
        {icon && <span className="input-icon">{icon}</span>}
        <input
          type={type}
          id={name}
          name={name}
          className={`form-input ${className} ${error ? "input-error" : ""}`}
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