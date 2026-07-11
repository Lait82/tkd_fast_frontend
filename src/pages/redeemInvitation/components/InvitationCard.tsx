import { ReactNode } from "react";
import { User } from "lucide-react";
import RoleBadge from "@/components/forms/RoleBadge";
import { InvitationPreview } from "../lib/schemas";
import { formatDate, formatDateRange } from "../lib/format";

interface InvitationCardProps {
	invitation: InvitationPreview;
	children: ReactNode;
}

/**
 * Cáscara compartida por ambas vistas: banner, título, quién invita,
 * rol y fechas. El contenido inferior (texto + timer + botón) llega por children.
 */
const InvitationCard = ({ invitation, children }: InvitationCardProps) => {
	const { tournament, inviter, role } = invitation;
	const inviterName = [inviter.firstname, inviter.lastname]
		.filter(Boolean)
		.join(" ");

	return (
		<div className="bg-elevated w-5xl rounded-lg shadow-lg overflow-hidden">
			<div className="aspect-1024/240 w-full bg-bgbase">
				<img
					className="h-full w-full object-cover"
					src="https://picsum.photos/1024/240"
					alt="banner del torneo"
				/>
			</div>

			<div className="flex flex-col gap-4 p-2">
				<div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
					<div className="flex flex-col gap-2">
						<h1 className="text-4xl font-bold">
							{tournament.name}
						</h1>
						<div className="grid grid-cols-3 items-center">
							{/* invited by */}
							<div className="flex flex-col gap-1.5" >
								<div className="flex items-center gap-1 w-fit text-muted bg-bgbase pl-1 pr-1 py-0.5 rounded-full">
									<span className="flex items-center justify-center">
										<User size={28} />
									</span>
									<span>
										<span className="capitalize">
											{inviterName || "Alguien"}
										</span>
										{" te ha invitado"}
									</span>
								</div>

								<div className="flex items-center gap-2 text-sm ml-1">
									<span className="text-muted">Tu rol:</span>
									<RoleBadge role={role} />
								</div>
							</div>

							{/* Event date */}
							<div className="flex w-full justify-center">
								<div className="flex flex-col gap-0.5">
									<span className="text-muted">Fecha del evento</span>
									<span className="text-xl font-bold text-neutrallight">
										{formatDateRange(
											tournament.date_of_event,
											tournament.date_of_finish
										)}
									</span>
								</div>
							</div>

							{/* Inscriptions close */}
							<div className="flex items-center w-full justify-center">
								<div className="flex flex-col gap-0.5">
									<span className="text-muted">
										Cierre de inscripciones
									</span>
									<span className="text-xl font-bold text-neutrallight">
										{formatDate(tournament.inscriptions_deadline)}
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				<hr className="border-super-elevated"  />

				<div className="flex flex-col items-center gap-3 text-center px-2 pb-2">
					{children}
				</div>
			</div>
		</div>
	);
};

export default InvitationCard;
