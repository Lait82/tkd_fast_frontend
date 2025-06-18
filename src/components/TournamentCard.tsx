import "../styles/TournamentCard.css";

interface Tournament {
	id: number;
	title: string;
	date: string;
	daysRemaining: string;
	image: string;
	status: string;
	statusType: "competitor" | "instructor";
}

interface TournamentCardProps {
	tournament: object;
}

const TournamentCard = ({ tournament }: TournamentCardProps) => {
	return (
		<div className="tournament-card">
			<div className="tournament-image">
				<img
					src={tournament.image || "/placeholder.svg"}
					alt={tournament.title}
				/>
				<div className="tournament-status"></div>
			</div>
			<div className="tournament-info">
				<h3>{tournament.title}</h3>
				<div className="items-center flex justify-between">
					<span className="text-muted tournament-date">
						{tournament.date} - {tournament.daysRemaining}
					</span>
					<span className={`status-badge ${tournament.statusType}`}>
						{tournament.status}
					</span>
				</div>
			</div>
		</div>
	);
};

export default TournamentCard;
