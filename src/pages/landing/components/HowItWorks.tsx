import { ArrowRight, Calendar, Trophy, Users } from "lucide-react"
import "../styles/HowItWorks.css"

const HowItWorks = () => {
  return (
    <section className="how-it-works">
      <div className="container">
        <div className="section-header">
          <h2>How <span className="text-logo">TKD Fast</span> Works</h2>
          <p>Simple steps to organize and manage your Taekwondo tournaments</p>
        </div>

        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-icon">
              <Calendar size={32} />
            </div>
            <h3>Create Tournament</h3>
            <p>Set up your tournament with dates, categories, and registration details in minutes.</p>
          </div>

          <div className="step-connector">
            <ArrowRight size={24} />
          </div>

          <div className="step">
            <div className="step-number">2</div>
            <div className="step-icon">
              <Users size={32} />
            </div>
            <h3>Invite Participants</h3>
            <p>Share registration links with schools and athletes to join your tournament.</p>
          </div>

          <div className="step-connector">
            <ArrowRight size={24} />
          </div>

          <div className="step">
            <div className="step-number">3</div>
            <div className="step-icon">
              <Trophy size={32} />
            </div>
            <h3>Manage & Compete</h3>
            <p>Run your tournament smoothly with real-time brackets, scoring, and results.</p>
          </div>
        </div>

        <div className="action-button">
          <a href="/signup" className="btn-primary">
            Get Started Now
          </a>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
