import { useNavigate } from "react-router-dom";
import Button from "@/components/Button";
import RoleBadge from "@/components/forms/RoleBadge";
import { Role } from "@/types/enums";

export interface InvitationBannerData {
	tournamentName: string | null;
	tournamentCode: string | null;
	role: Role;
}

interface InvitationBannerProps {
	data: InvitationBannerData;
	onDismiss: () => void;
}

/** Banner que confirma que una invitación quedó asignada a la cuenta logueada. */
const InvitationBanner = ({ data, onDismiss }: InvitationBannerProps) => {
	const navigate = useNavigate();
	const { tournamentName, tournamentCode, role } = data;

	return (
		<div className="bg-elevated rounded-lg shadow-lg p-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
			<div className="flex items-center gap-3">
				<img
					className="h-16 w-28 shrink-0 rounded-md object-cover"
					src="https://picsum.photos/224/128"
					alt={tournamentName ?? "torneo"}
				/>
				<div className="flex flex-col gap-1">
					<span className="text-neutrallight">
						Fuiste invitado a{" "}
						<span className="font-extrabold">
							{tournamentName ?? "un torneo"}
						</span>
					</span>
					<RoleBadge role={role} />
				</div>
			</div>

			<div className="flex gap-2 shrink-0">
				{tournamentCode && (
					<Button
						type="button"
						variant="primary"
						onClick={() => navigate(`/${tournamentCode}/dashboard`)}
					>
						Ir al panel
					</Button>
				)}
				<Button type="button" variant="secondary" onClick={onDismiss}>
					Entendido
				</Button>
			</div>
		</div>
	);
};

export default InvitationBanner;
