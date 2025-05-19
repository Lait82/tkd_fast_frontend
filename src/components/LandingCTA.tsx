import "../styles/LandingCTA.css"

const LandingCTA = () => {
  return (
    <section className="enhanced-cta">
      <div className="cta-background">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
      </div>

      <div className="cta-content">
        <h2>Ready to Get Started?</h2>
        <p>Join thousands of athletes and organizers who are already using TKD Fast</p>
        <div className="cta-buttons">
          <a href="/signup" className="btn-primary">
            Sign Up Now
          </a>
          <a href="/tournaments" className="btn-secondary">
            View Tournaments
          </a>
        </div>
      </div>
    </section>
  )
}

export default LandingCTA
