import RoleBadge from "@/components/forms/RoleBadge";
import { Role } from "@/types/enums";
import { Tournament } from "@/types/tournament";
import { getHighestRole } from "@/utils/utils";
import dayjs from "dayjs";
import { Edit } from "lucide-react";

interface BannerProps {
	tournament: Tournament;
}
const Banner = ({ tournament }: BannerProps) => {
	return (
		<div className="bg-elevated flex flex-col gap-2 shadow-lg justify-center create-tournament-card p-3 rounded-lg">
			<div className="flex gap-1 items-center">
				<h1 className="text-3xl font-extrabold">{tournament.name ?? <span className="italic text-lg text-muted font-light">(Sin nombre)</span>}</h1>
				{getHighestRole(tournament.role) === Role.ORGANIZER && (
					<span className="w-fit h-full transition-all ease-fluid flex items-center">
						<a href={`/${tournament.code}/edit-tournament`}>
							<Edit className="transition-all hover:text-orange" />
						</a>
					</span>
				)}
				{tournament.role.map((role) => (
					<RoleBadge role={role} />
				))}
			</div>
			<div className="grid grid-cols-6 gap-2">
				<div className="w-full col-span-5">
					<img
						className="rounded-lg shadow-lg h-full"
						src="https://picsum.photos/1024/200"
						alt="banner"
					/>
				</div>

				<div className="flex flex-col gap-2">
					{/* <div className="flex gap-2">
									{tournament.role.map((role) => (
										<RoleBadge role={role} />
									))}
								</div> */}
					<div className="flex flex-col">
						<span className="text-muted">Fecha del evento</span>
						<span className="text-neutrallight font-semibold text-lg">
							{dayjs().format("D MMMM YYYY")}
						</span>
					</div>

					<div className="flex flex-col">
						<span className="text-muted">
							Apertura de inscripciones
						</span>
						<span className="text-neutrallight font-semibold text-lg">
							{dayjs().format("D MMMM YYYY")}
						</span>
					</div>

					<div className="flex flex-col">
						<span className="text-muted">
							Cierre de inscripciones
						</span>
						<span className="text-neutrallight font-semibold text-lg">
							{dayjs().format("D MMMM YYYY")}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Banner;
