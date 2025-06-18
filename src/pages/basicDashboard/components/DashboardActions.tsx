"use client";

import { FaMapMarkerAlt, FaTrophy } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { Hash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "@/styles/DashboardActions.css";

const DashboardActions = () => {
	const navigate = useNavigate();

	const actions = [
		{
			icon: <FaMapMarkerAlt />,
			title: "Ver Todos los Torneos",
			description: "Ve todos los torneos disponibles.",
			action: () => navigate("/tournaments"),
			highlight: ">>>",
		},
		{
			icon: <FaTrophy />,
			title: "Crear Torneo",
			description: "Usa tu código de torneo.",
			action: () => navigate("/create-tournament"),
			highlight: ">>>",
		},
		{
			icon: <Hash />,
			title: "Obtén tu código de torneo",
			description:
				"Contáctanos por Whatsapp y obtén tu código de torneo.",
			action: () => window.open("https://wa.me/1234567890", "_blank"),
			highlight: ">>>",
			//   badge: "142",
		},
		{
			icon: <FaGear />,
			title: "Configura tu perfil",
			description: "Edita tu información personal.",
			action: () => navigate("/profile"),
			highlight: ">>>",
		},
	];

	return (
		<div className="dashboard-actions">
			{actions.map((action, index) => (
				<div
					key={index}
					className="action-item"
					onClick={action.action}
				>
					<span className="action-icon">{action.icon}</span>
					<div className="action-content">
						{/* {action.badge && <span className="action-badge">{action.badge}</span>} */}
						<h3>{action.title}</h3>
						<p>
							{action.description}{" "}
							<span className="action-highlight">
								{action.highlight}
							</span>
						</p>
					</div>
				</div>
			))}
		</div>
	);
};

export default DashboardActions;
