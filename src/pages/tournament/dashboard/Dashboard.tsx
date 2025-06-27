"use client";

// import { useState, useEffect } from "react"
// import { useAuth } from "../../context/AuthContext"
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "@/styles/Dashboard.css";
import { FaMapMarkerAlt, FaTrophy } from "react-icons/fa";
import { Hash } from "lucide-react";
import { FaGear } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import BlurredBg from "@/components/BlurredBg";
// import { useTournament } from "@/context/TournamentContext";
// import { TournamentActions } from "@/types/enums";
import { useAuthStore } from "@/states/useAuthStore";
import { useTournamentStore } from "@/states/useTournamentStore";
import dayjs from "dayjs";
import RoleBadge from "@/components/forms/RoleBadge";
import { TournamentActions } from "@/types/enums";
import ActionItem from "./components/ActionItem";
import GoBack from "@/components/GoBack";

const Dashboard = () => {
	const { user } = useAuthStore();
	const navigate = useNavigate();
	const { tournament, can } = useTournamentStore();
	// TODO: Organizar los permisos de acciones de torneo
	const actions = [
		{
			icon: <FaMapMarkerAlt />,
			title: "Ver llaves / cronograma",
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
			action: () => navigate(`/${tournament.code}/info`),
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
			allowed: can(TournamentActions.INVITE_INSTRUCTOR),
			action: () => navigate("/"),
		},
		{
			icon: <FaGear />,
			title: "Administrar Competidores y Equipos",
			description: `Inscribí competidores, ADSGADGADGADG. ${tournament?.code}`,
			allowed: can(TournamentActions.MANAGE_COMPETITORS),
			action: () => navigate(`/${tournament.code}/competitors`),
		},
		{
			icon: <FaGear />,
			title: "Administrar Categorias",
			description:
				"Agregá categorias, editá los pesos y cinturones de cada categoría.",
			allowed: can(TournamentActions.MANAGE_CATEGORIES),
			action: () => navigate("/"),
		},
		{
			icon: <FaGear />,
			title: "Invitar Maestros",
			description:
				"Invita formalmente a maestros de otras escuelas/asociaciones para que puedan invitar a sus instructores.",
			allowed: can(TournamentActions.INVITE_MASTER),
			action: () => navigate("/"),
		},
		{
			icon: <FaGear />,
			title: "Administrar Torneo",
			description: "Modifica la información disponible del torneo.",
			allowed: can(TournamentActions.MANAGE_TOURNAMENT),
			action: () => navigate(`/${tournament.code}/edit-tournament`),
		},
	];

	return (
		<div className="dashboard-page">
			<Header />
			<main className="flex flex-col gap-2 py-2 px-1.5 max-w-100 w-full my-0 mx-auto">
				<GoBack />
				<div className="grid grid-cols-2 items-start bg-elevated shadow-card rounded-lg  gap-2 p-4">
					<div className="welcome-section items-end col-span-2 grid gap-2 grid-cols-2">
						<h1 className="text-neutrallight text-3xl">
							Hola{" "}
							<span className="capitalize">
								{user?.firstname || "Juanito"}!
							</span>{" "}
							Que quieres hacer?
						</h1>
						<div>
							<div className="flex gap-1">
								{tournament.role.map((role) => (
									<RoleBadge role={role} />
								))}
							</div>
							{/* Capa de fondo con blur y oscurecimiento */}
							<BlurredBg>
								<div className="relative p-1 text-white mt-1">
									<h1 className="text-xl font-bold">
										{tournament.name}
									</h1>
									<span className="text-muted">
										{dayjs(tournament.created_at).format(
											"D MMMM YYYY"
										)}{" "}
										- Faltan{" "}
										{dayjs(tournament.created_at).diff(
											dayjs()
										) /
											1000 /
											3600}{" "}
										días
									</span>
								</div>
							</BlurredBg>
						</div>
					</div>

					{actions.map((action, index) => (
						// <div
						// 	key={index}
						// 	className="action-item"
						// 	onClick={action.action}
						// >
						// 	<span className="action-icon">{action.icon}</span>
						// 	<div className="action-content">
						// 		{/* {action.badge && <span className="action-badge">{action.badge}</span>} */}
						// 		<h3 className="text-xl">{action.title}</h3>
						// 		<p>
						// 			{action.description}{" "}
						// 			<span className="action-highlight font-black">{`>>>`}</span>
						// 		</p>
						// 	</div>
						// </div>
						<ActionItem action={action} index={index} />
					))}
				</div>
			</main>
			<Footer />
		</div>
	);
};

export default Dashboard;
