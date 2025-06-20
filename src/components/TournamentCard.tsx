import { Tournament } from "@/types/tournament";
import "../styles/TournamentCard.css";
import { useNavigate } from "react-router-dom";
import RoleBadge from "./forms/RoleBadge";

interface TournamentCardProps {
	tournament: Tournament;
}

const TournamentCard = ({ tournament }: TournamentCardProps) => {
	const navigate = useNavigate();
	const route = `/${tournament.code}/dashboard`;
	return (
		<div className="tournament-card" onClick={() => navigate(route)}>
			<div className="tournament-image">
				<img
					src={"https://picsum.photos/586/120"}
					alt={tournament.name ?? ""}
				/>
				<div className="tournament-status"></div>
			</div>
			<div className="tournament-info">
				<h3>{tournament.name}</h3>
				<div className="items-center flex justify-between">
					<span className="text-muted tournament-date">
						{tournament.date_of_event ?? (
							<i className="text-muted">Todavía sin definir</i>
						)}{" "}
						- N dias restantes
					</span>
					<div className="flex gap-1">
						{tournament.role.map((role) => (
							<RoleBadge role={role} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default TournamentCard;
