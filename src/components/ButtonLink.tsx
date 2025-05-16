import React from "react"
import { Link, LinkProps } from "react-router-dom"

interface ButtonLinkProps extends LinkProps {
  variant?: "primary" | "secondary"
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
  className?: string
  children: React.ReactNode
}

const ButtonLink: React.FC<ButtonLinkProps> = ({
  to,
  variant = "primary",
  iconLeft,
  iconRight,
  className = "",
  children,
  ...props
}) => {
  return (
    <Link
      to={to}
      className={`btn-base ${variant === "primary" ? "btn-primary" : "btn-secondary"} ${className}`}
      {...props}
    >
      {iconLeft && <span className="btn-icon-left">{iconLeft}</span>}
      {children}
      {iconRight && <span className="btn-icon-right">{iconRight}</span>}
    </Link>
  )
}

export default ButtonLink
