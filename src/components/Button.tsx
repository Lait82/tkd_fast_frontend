import React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary"
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  iconLeft,
  iconRight,
  className = "",
  ...props
}) => {
  return (
    <button
      className={`btn-base ${variant === "primary" ? "btn-primary" : "btn-secondary"} ${className}`}
      {...props}
    >
      {iconLeft && <span className="btn-icon-left">{iconLeft}</span>}
      {children}
      {iconRight && <span className="btn-icon-right">{iconRight}</span>}
    </button>
  )
}

export default Button
