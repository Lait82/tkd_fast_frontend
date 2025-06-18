"use client";

// import { useState, useEffect } from "react"
// import { useAuth } from "../../context/AuthContext"
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "../../styles/Dashboard.css";
import { FaMapMarkerAlt, FaTrophy } from "react-icons/fa";
import { Hash } from "lucide-react";
import { FaGear } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import BlurredBg from "@/components/BlurredBg";
// import { useTournament } from "@/context/TournamentContext";
// import { TournamentActions } from "@/types/enums";
import { useAuthStore } from "@/states/useAuthStore";
import { useTournamentStore } from "@/states/useTournamentStore";

const Dashboard = () => {
	const { user } = useAuthStore();
	const navigate = useNavigate();
	const { tournament } = useTournamentStore();

	const actions = [
		{
			icon: <FaMapMarkerAlt />,
			title: "Ver llaves/Cronograma",
			description:
				"Aca vas a poder ver las llaves cuando esten disponibles y el cronograma de tus torneos.",
			allowed: true,
			action: () => navigate("/"),
		},
		{
			icon: <FaTrophy />,
			title: "Ver Info del Torneo",
			description:
				"UMira información detallada del torneo en el perfil del evento.",
			allowed: true,
			action: () => navigate("/"),
		},
		{
			icon: <Hash />,
			title: "Obtén tu código de torneo",
			description:
				"Contáctanos por Whatsapp y obtén tu código de torneo.",
			allowed: true,
			action: () => window.open("https://wa.me/1234567890", "_blank"),
		},
		{
			icon: <FaGear />,
			title: "Invitar Instructores",
			description:
				"Invitá a todos tus instructores enviandoles un link para que puedan inscribir a sus alumnos.",
			allowed: "INVITE_INSTRUCTOR",
			action: () => navigate("/"),
		},
		{
			icon: <FaGear />,
			title: "Administrar Competidores y Equipos",
			description: `Inscribí competidores, ADSGADGADGADG. ${tournament?.code}`,
			allowed: true,
			action: () => navigate("/"),
		},
		{
			icon: <FaGear />,
			title: "Administrar Categorias",
			description:
				"Agregá categorias, editá los pesos y cinturones de cada categoría.",
			allowed: true,
			action: () => navigate("/"),
		},
		{
			icon: <FaGear />,
			title: "Invitar Maestros",
			description:
				"Invita formalmente a maestros de otras escuelas/asociaciones para que puedan invitar a sus instructores.",
			allowed: true,
			action: () => navigate("/"),
		},
		{
			icon: <FaGear />,
			title: "Administrar Torneo",
			description: "Modifica la información disponible del torneo.",
			allowed: true,
			action: () => navigate("/"),
		},
	];

	return (
		<div className="dashboard-page">
			<Header />

			<main className="dashboard-container">
				<div className="dashboard-content gap-2 p-4">
					<div className="welcome-section items-end col-span-2 grid grid-cols-2">
						<h1 className="text-neutrallight text-3xl">
							Hola {user?.firstname || "Juanito"}! Que quieres
							hacer?
						</h1>
						<div>
							<span
								className={`status-badge ${`organizer`}`}
							>{`Organizer`}</span>
							{/* Capa de fondo con blur y oscurecimiento */}
							<BlurredBg>
								<div className="relative p-1 text-white mt-1">
									<h1 className="text-xl font-bold">
										ADCC Latin America Edition/Santiago Open
									</h1>
									<span className="text-muted">
										06 Jun - Faltan 15 días
									</span>
								</div>
							</BlurredBg>
						</div>
					</div>

					{actions.map((action, index) => (
						<div
							key={index}
							className="action-item"
							onClick={action.action}
						>
							<span className="action-icon">{action.icon}</span>
							<div className="action-content">
								{/* {action.badge && <span className="action-badge">{action.badge}</span>} */}
								<h3 className="text-xl">{action.title}</h3>
								<p>
									{action.description}{" "}
									<span className="action-highlight font-black">{`>>>`}</span>
								</p>
							</div>
						</div>
					))}
				</div>
			</main>

			<Footer />
		</div>
	);
};

export default Dashboard;
