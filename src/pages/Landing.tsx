import { FaUserFriends, FaMobileAlt } from "react-icons/fa"
import {TbTournament } from "react-icons/tb"
import Header from "../components/Header"
import Footer from "../components/Footer"
import FeatureCard from "../components/FeatureCard"
import "../styles/Landing.css"
import ButtonLink from "@/components/ButtonLink"
import { Zap } from "lucide-react"

const Landing = () => {
  return (
    <div className="landing-page">
      <Header />

      <main>
        <section className="hero">
          <div className="container hero-container">
            <div className="hero-content">
              <h1>Organizá. Invitá. Competí.</h1>
              <p>
                La forma más rápida y simple de gestionar torneos de Taekwondo. Registrá usuarios, cargá competidores, y compartí las llaves en tiempo real.
              </p>
              <div className="hero-buttons">
                <ButtonLink to="/signup" className="font-bold">
                  Empieza ahora
                </ButtonLink>
                {/* <Link to="/tournaments" className="btn-secondary">
                  View Tournaments
                </Link> */}
              </div>
            </div>

            <div className="hero-video">
              <video autoPlay loop muted playsInline>
                <source src="/videos/tkd_demo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </section>

        <section className="features">
          <div className="container">
            <div className="section-header">
              <h2>¿Por qué elegir TKD Fast?</h2>
              <p>Esto recién empieza. Estamos construyendo la herramienta que moderniza la forma de organizar torneos, y vos podés ser parte desde el primer día.
              </p>
            </div>

            <div className="features-grid">
              <FeatureCard
                color="yellow"
                icon={<Zap size={35} fill="var(--color-yellow)" />}
                title="Inscripción Rápida"
                description="Inscribite en torneos en pocos pasos. Evitá formularios largos y empezá a organizar sin complicaciones."
                />
              <FeatureCard
                color="green"
                icon={<FaUserFriends />}
                title="Gestión de Instructores"
                description="Invitá a maestros e instructores a colaborar en tus torneos inscribiendo a sus competidores."
                />
              <FeatureCard
                color="blue"
                icon={<TbTournament />}
                title="Creación de Llaves"
                description="Armá automáticamente las llaves por categoría, asegurando que los compañeros solo peleen si es necesario. Sin hojas de cálculo, sin problemas en la mesa."
              />
              <FeatureCard
                color="red"
                icon={<FaMobileAlt />}
                title="Acceso desde Cualquier Dispositivo"
                description="Revisá horarios, competidores y resultados desde tu celular, tablet o computadora. Todo desde el navegador."
              />
            </div>
          </div>
        </section>

        <section className="testimonials">
          <div className="container">
            <div className="section-header">
              <h2>What Our Users Say</h2>
              <p>Hear from athletes and organizers who use TKD Fast</p>
            </div>

            <div className="testimonials-grid">
              <div className="testimonial">
                <div className="testimonial-content">
                  <p>
                    "TKD Fast has revolutionized how we organize tournaments. The registration process is seamless, and
                    the real-time results feature has been a game-changer."
                  </p>
                </div>
                <div className="testimonial-author">
                  <img src="/diverse-group.png" alt="John Doe" className="testimonial-avatar" />
                  <div>
                    <h4>John Doe</h4>
                    <p>Tournament Organizer</p>
                  </div>
                </div>
              </div>

              <div className="testimonial">
                <div className="testimonial-content">
                  <p>
                    "As an athlete, I love how easy it is to register for tournaments and track my performance. The
                    platform has helped me improve my skills and connect with other athletes."
                  </p>
                </div>
                <div className="testimonial-author">
                  <img src="/diverse-woman-portrait.png" alt="Jane Smith" className="testimonial-avatar" />
                  <div>
                    <h4>Jane Smith</h4>
                    <p>National Champion</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="cta">
          <div className="container">
            <h2>Ready to Get Started?</h2>
            <p>Join thousands of athletes and organizers who are already using TKD Fast</p>
            <ButtonLink to="/signup">
              Sign Up Now
            </ButtonLink>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Landing
