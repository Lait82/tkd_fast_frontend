import { useEffect, ReactNode } from "react";
import { useParams } from "react-router-dom";
// import { Tournament } from "../types/tournament";
import { useTournamentStore } from "@/states/useTournamentStore";
import { errorToast } from "@/services/toasts";
import { Toaster } from "sonner";
import { RxCheckCircled, RxCrossCircled } from "react-icons/rx";

interface TournamentLoaderProps {
	children: ReactNode;
}

const TournamentLoader = ({ children }: TournamentLoaderProps) => {
	const { tournamentCode } = useParams();
	const { tournament, getTournamentInfo, loading, error } =
		useTournamentStore();

	useEffect(() => {
		console.log("tournamentCode ===> ", tournamentCode);
		console.log("tournament ===> ", tournament);

		if (
			tournamentCode &&
			(!tournament || tournament.code !== tournamentCode)
		) {
			getTournamentInfo(tournamentCode);
		}
	}, [tournamentCode, tournament, getTournamentInfo]);

	if (loading) return <div>Loading tournament...</div>;
	if (error) return <div>Error: {error}</div>;
	if (!tournament) errorToast("Hubo un error al obtener el torneo");

	return (
		<>
			{" "}
			<Toaster
				position="top-right"
				icons={{
					error: (
						<RxCrossCircled size={36} color="var(--color-red)" />
					),
					success: (
						<RxCheckCircled size={36} color="var(--color-green)" />
					),
				}}
				toastOptions={{
					style: {
						background: "#373838",
						border: "none",
						color: "var(--color-neutrallight)",
						borderRadius: "8px",
					},
					duration: 5000,
				}}
			/>
			{/* TODO: Mover sonner al layout */}
			{children}
		</>
	);
};

export default TournamentLoader;
