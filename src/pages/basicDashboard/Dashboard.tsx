"use client";

// import { useState, useEffect } from "react";
// import { useAuth } from "../context/AuthContext"
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DashboardActions from "./components/DashboardActions";
import TournamentCard from "@/components/TournamentCard";
import "@/styles/Dashboard.css";
import { useAuthStore } from "@/states/useAuthStore";
import { FC, useEffect, useState } from "react";
import { getUserTournaments } from "@/services/userService";
import { Tournament } from "@/types/tournament";
import { tournamentSchema } from "@/types/schemas/primitiveSchemas";
import { errorToast } from "@/services/toasts";
import TypeItComponent from "typeit-react";

const Dashboard = () => {
	const { user } = useAuthStore();
	const [tournaments, setTournaments] = useState<Tournament[]>([]);
	const [loading, setLoading] = useState(true);

	const TypeIt = TypeItComponent as FC<any>;

	useEffect(() => {
		let isMounted = true;
		const fetchTournaments = async () => {
			try {
				const res = await getUserTournaments();
				const tournamentsArr = tournamentSchema.array().parse(res);
				if (isMounted) setTournaments(tournamentsArr);
			} catch (error) {
				console.error("Error al obtener torneos:", error);
				errorToast(
					"Ha ocurrido un error al obtener los torneos, por favor recarga la página."
				);
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
								Hola{" "}
								<span className="capitalize">
									{" "}
									{user?.firstname || "Juanito"}
								</span>
								! Que quieres hacer?
							</h1>
						</div>

						<DashboardActions />
					</div>

					<div className="dashboard-right">
						<div className="tournaments-section flex flex-col gap-2">
							<h1 className="text-2xl">Mis Torneos</h1>
							<div className="tournaments-grid">
								{loading ? (
									<div className=" flex justify-center items-center w-full h-full font-black">
										<TypeIt
											as={"h1"}
											options={{
												loop: true,
											}}
											getBeforeInit={(instance: any) => {
												instance
													.type("Cargando")
													.pause(250)
													.type(".")
													.pause(200)
													.type(".")
													.pause(300)
													.type(".")
													.pause(200)
													.delete(3);
												return instance;
											}}
										/>
									</div>
								) : (
									tournaments.map((tournament) => (
										<TournamentCard
											key={tournament.id}
											tournament={tournament}
										/>
									))
								)}
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
