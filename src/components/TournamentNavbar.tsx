import { useTournamentStore } from "@/states/useTournamentStore";
import { Role } from "@/types/enums";
import { getHighestRole } from "@/utils/utils";
import { Link, useLocation } from "react-router-dom";

const TournamentNavbar = () => {
	// const [isOpen, setIsOpen] = useState(false);
	// const { isAuthenticated, logout } = useAuthStore();
	const { tournament } = useTournamentStore();
	const location = useLocation();
	const currentRoute = location.pathname.replace(/^.*\/([^/]+)\/?$/, "$1");
	// const toggleMenu = () => {
	//     setIsOpen(!isOpen);
	// };
	const info = {
		text: "Info",
		route: `/${tournament.code}/info`,
		view: "info",
	};
	const competitors = {
		text: "Competidores",
		route: `/${tournament.code}/competitors`,
		view: "competitors",
	};
	const categories = {
		text: "Categorías",
		route: `/${tournament.code}/categories`,
		view: "categories",
	};
	const invites = {
		text: "Invitaciones",
		route: `/${tournament.code}/invites`,
		view: "invites",
	};

	const organizersOptions = [info, competitors, categories, invites];
	const mastersOptions = [info, competitors, categories, invites];
	const instructorAndBelowOptions = [info, competitors, categories];

	const availableOptions = {
		[Role.ORGANIZER]: organizersOptions,
		[Role.MASTER]: mastersOptions,
		[Role.INSTRUCTOR]: instructorAndBelowOptions,
		[Role.COMPETITOR]: instructorAndBelowOptions,
		[Role.NONE]: instructorAndBelowOptions,
	};

	const options = availableOptions[getHighestRole(tournament.role)];
	return (
		<div className="flex gap-3 bg-elevated shadow-card rounded-full font-extrabold w-fit py-1 px-1.5">
			{options.map((option) => (
				<span key={option.text}>
					<Link
						className={`transition-all ease-fluid hover:text-orange ${
							option.view === currentRoute
								? "text-orange"
								: "text-neutrallight"
						}`}
						to={option.route}
					>
						{option.text}
					</Link>
				</span>
			))}
		</div>
	);
};

export default TournamentNavbar;
