import React from "react"

interface LabelProps {
  label: string
  name: string
  required: boolean | undefined
  horizontal?: boolean | undefined
}

const Label: React.FC<LabelProps> = ({name, required, label, horizontal}) => {
  return(
  <label htmlFor={name} className={`${horizontal ? "form-label-horizontal mr-2" : "form-label"}`}>
    {required && <span className="text-orange">{'* '}</span>}
      {label}
    </label>
)}

export default Label