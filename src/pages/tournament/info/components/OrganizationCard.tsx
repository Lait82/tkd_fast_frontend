import { FaEnvelope, FaWhatsapp } from "react-icons/fa";
import { Tournament } from "@/types/tournament";
import { User } from "lucide-react";

interface OrganizationCardProps {
	tournament: Tournament;
}

const OrganizationCard = ({ tournament }: OrganizationCardProps) => {
	return (
		<div className="flex bg-elevated flex-col gap-2 shadow-lg rounded-lg p-2">
			{" "}
			{/* Organizacion */}
			<h1 className="text-2xl font-extrabold">Organizacion</h1>
			<ul className="flex flex-col gap-1.5 text-lg font-semibold">
				<li className="flex items-center cursor-default gap-1 transition-all">
					<User size={30} />
					Organizador: Adrian Barone
				</li>
				<li>
					<a
						className="flex items-center gap-1 transition-all hover:text-orange"
						href={`mailto:manuexposito82@outlook.com`}
					>
						<FaEnvelope size={30} />
						Email: Adrian Barone
						<span className="text-orange">{">>>"}</span>
					</a>
				</li>
				<li>
					<a
						className="flex items-center gap-1 transition-all hover:text-orange"
						href={`https://wa.me/${2246438109}?text=Hola%21%20Tengo%20una%20consulta%20sobre%20el%20torneo.`}
					>
						<FaWhatsapp size={32} />
						Whatsapp: Adrian Barone
						<span className="text-orange">{">>>"}</span>
					</a>
				</li>
			</ul>
		</div>
	);
};
export default OrganizationCard;
