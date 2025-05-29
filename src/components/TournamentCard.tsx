import "../styles/TournamentCard.css"

interface Tournament {
  id: number
  title: string
  date: string
  daysRemaining: string
  image: string
  status: string
  statusType: "competitor" | "instructor"
}

interface TournamentCardProps {
  tournament: Tournament
}

const TournamentCard = ({ tournament }: TournamentCardProps) => {
  return (
    <div className="tournament-card">
      <div className="tournament-image">
        <img src={tournament.image || "/placeholder.svg"} alt={tournament.title} />
        <div className="tournament-status">
          <span className={`status-badge ${tournament.statusType}`}>{tournament.status}</span>
        </div>
      </div>
      <div className="tournament-info">
        <h3>{tournament.title}</h3>
        <p className="text-muted tournament-date">
          {tournament.date} - {tournament.daysRemaining}
        </p>
      </div>
    </div>
  )
}

export default TournamentCard
