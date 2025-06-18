import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../../styles/Landing.css";
import GoBack from "@/components/GoBack";

const About = () => {
	return (
		<div className="landing-page">
			<Header />

			<main>
				<section className="flex flex-col pt-3 gap-2 p-4">
					<GoBack />
					<div className="p-4 pt-3 bg-elevated shadow-card rounded-lg">
						<h1 className="text-4xl mb-4 font-bold">
							Sobre Nosotros{" "}
							<span className="text-orange">{">>>"}</span>
						</h1>

						<div className="flex gap-2">
							<img
								className="max-w-1/3 rounded-lg shadow-card"
								src="/about_us.jpg"
								alt="about_us"
								style={{ objectFit: "cover" }}
							/>
							<p
								className="text-lg text-neutral-200"
								style={{
									maxWidth: "none",
									letterSpacing: ".5px",
								}}
							>
								<span className="text-orange font-bold">
									<span className="text-logo text-neutrallight">
										TKDFast
									</span>{" "}
									nació de una necesidad real:{" "}
								</span>
								<span className="text-muted">
									como practicante de Taekwondo desde hace más
									de 8 años y profesional del desarrollo de
									software, noté que los torneos seguían
									gestionándose con herramientas incómodas,
									visualmente anticuadas y con flujos que
									generaban más trabajo del necesario.{" "}
								</span>{" "}
								<br />
								<br />
								<span className="text-orange font-bold">
									Muchos organizadores enfrentan los mismos
									problemas:{" "}
								</span>
								<span className="text-muted">
									Planillas complejas, inscripciones manuales,
									confusión con categorías y errores en el
									armado de llaves. Y lo que existía en el
									mercado no ofrecía una solución integral con
									una experiencia de usuario fluida, una
									estética cuidada, y una estructura pensada
									realmente para el Taekwondo.
								</span>
								<br />
								<br />
								<span className="text-orange font-bold">
									Por eso creamos{" "}
									<span className="text-logo text-neutrallight">
										TKDFast
									</span>
									:
								</span>{" "}
								<span className="text-muted">
									Una plataforma enfocada en resolver los
									dolores reales de quienes organizan torneos.
									Porque entendemos el deporte desde adentro,
									y también sabemos cómo traducir esas
									necesidades en una herramienta ágil, clara y
									moderna.
								</span>
								<br />
								<br />
								<span className="text-muted">
									Actualmente, la plataforma se centra en el
									armado de llaves de combate e invitación de
									maestros e instructores, una de las partes
									más críticas de cualquier torneo. Decidimos
									empezar por ahí porque creemos que es mejor
									empezar por una sola cosa y hacerla bien,
									antes que sumar funcionalidades a medias.
									Igual que en el Taekwondo, construir una
									base sólida y desde ahí avanzar. <br />
									<br />
									<span className="text-orange font-bold">
										Esto recién empieza... <br />
									</span>{" "}
									Tenemos ideas concretas y soluciones
									innovadoras planeadas para el mediano plazo,
									siempre con el mismo objetivo: elevar la
									organización de torneos de Taekwondo a un
									nuevo nivel. <br />
								</span>
								<br />
							</p>
						</div>
					</div>
				</section>
			</main>

			<Footer />
		</div>
	);
};

export default About;
