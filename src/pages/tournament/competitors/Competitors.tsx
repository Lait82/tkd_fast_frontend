"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GoBack from "@/components/GoBack";
import { useTournamentStore } from "@/states/useTournamentStore";
import TournamentNavbar from "@/components/TournamentNavbar";
import EnrolledCompetitors from "./components/EnrolledCompetitors";
import { TournamentActions } from "@/types/enums";
import ManageCompetitors from "./components/ManageCompetitors";
import { ManageCompetitorsProvider } from "./components/ManageCompetitorContext";

// Mock data for tournaments
const Competitors = () => {
	const { can } = useTournamentStore();
	return (
		<div className="create-tournament-page">
			<Header />

			<main className="create-tournament-container flex flex-col gap-2">
				<div className="grid grid-cols-3 items-center">
					<GoBack />
					<div className="flex justify-center w-ful">
						<TournamentNavbar />
					</div>
				</div>
				{can(TournamentActions.MANAGE_COMPETITORS) ? (
					<ManageCompetitorsProvider>
						<ManageCompetitors />
					</ManageCompetitorsProvider>
				) : null}
				<div className="flex flex-col">
					<EnrolledCompetitors />
				</div>
			</main>

			<Footer />
		</div>
	);
};

export default Competitors;
