import type { ReactNode } from "react"
import "../styles/FeatureCard.css"

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
  color: string
}

const FeatureCard = ({ icon, title, description, color }: FeatureCardProps) => {

  return (
    <div className="feature-card">
      <div className={`feature-icon ${color}`}>{icon}</div>
      <h3 className="feature-title">{title}</h3>
      <p className="feature-description">{description}</p>
    </div>
  )
}

export default FeatureCard
