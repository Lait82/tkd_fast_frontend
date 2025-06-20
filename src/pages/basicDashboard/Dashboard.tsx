"use client";

// import { useState, useEffect } from "react";
// import { useAuth } from "../context/AuthContext"
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DashboardActions from "./components/DashboardActions";
import TournamentCard from "@/components/TournamentCard";
import "@/styles/Dashboard.css";
import { useAuthStore } from "@/states/useAuthStore";
import { useEffect, useState } from "react";
import { getMyTournaments } from "@/services/tournamentService";
import { mapTo } from "@/utils/utils";
import { tournamentMap } from "@/types/modelMaps/tournamentMap";
import { Tournament } from "@/types/tournament";

// Mock data for tournaments
const mockTournaments = [
	{
		id: 1,
		title: "ADCC Latin America Edition / Santiago Open",
		date: "06 Jun",
		daysRemaining: "Faltan 15 Días",
		image: "https://picsum.photos/586/120",
		status: "Competidor",
		statusType: "competitor",
	},
	{
		id: 2,
		title: "ADCC Latin America Edition / Santiago Open",
		date: "06 Jun",
		daysRemaining: "Faltan 15 Días",
		image: "https://picsum.photos/586/120",
		status: "Master",
		statusType: "master",
	},
	{
		id: 3,
		title: "ADCC Latin America Edition / Santiago Open",
		date: "06 Jun",
		daysRemaining: "Faltan 15 Días",
		image: "https://picsum.photos/586/120",
		status: "Instructor",
		statusType: "instructor",
	},
	{
		id: 4,
		title: "ADCC Latin America Edition / Santiago Open",
		date: "06 Jun",
		daysRemaining: "Faltan 15 Días",
		image: "https://picsum.photos/586/120",
		status: "Organizer",
		statusType: "organizer",
	},
];

const Dashboard = () => {
	const { user } = useAuthStore();
	const [tournaments, setTournaments] = useState<Tournament[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let isMounted = true;
		const fetchTournaments = async () => {
			try {
				const res = await getMyTournaments();
				console.log(res);
				const tournamentsArr = res.map((tournament: object) =>
					mapTo(tournamentMap, tournament)
				);
				if (isMounted) setTournaments(tournamentsArr);
			} catch (error) {
				console.error("Error al obtener torneos:", error);
			} finally {
				if (isMounted) setLoading(false);
			}
		};

		fetchTournaments();

		return () => {
			isMounted = false; // cleanup para evitar memory leaks
		};
	}, []);

	return (
		<div className="dashboard-page">
			<Header />

			<main className="dashboard-container">
				<div className="dashboard-content flex gap-2 p-4">
					<div className="dashboard-left">
						<div className="welcome-section">
							<h1 className="text-neutrallight text-3xl">
								Hola {user?.firstname || "Juanito"}! Que quieres
								hacer?
							</h1>
						</div>

						<DashboardActions />
					</div>

					<div className="dashboard-right">
						<div className="tournaments-section flex flex-col gap-2">
							<h1 className="text-2xl">Mis Torneos</h1>
							<div className="tournaments-grid">
								{loading
									? "Cargando..."
									: tournaments.map((tournament) => (
											<TournamentCard
												key={tournament.id}
												tournament={tournament}
											/>
									  ))}
							</div>
						</div>
					</div>
				</div>
			</main>

			<Footer />
		</div>
	);
};

export default Dashboard;
