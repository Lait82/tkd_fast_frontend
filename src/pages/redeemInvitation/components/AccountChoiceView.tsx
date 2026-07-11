import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import InvitationCard from "./InvitationCard";
import { InvitationPreview } from "../lib/schemas";
import { migrateInvitation } from "../lib/services";
import { errorToast } from "@/services/toasts";
import Button from "@/components/Button";
import { InvitationBannerData } from "@/pages/basicDashboard/components/InvitationBanner";
import { ChevronRight, Info } from "lucide-react";

interface AccountChoiceViewProps {
	invitation: InvitationPreview;
	token: string;
	currentEmail: string;
	onKeepOriginal: () => void;
}

/**
 * Vista "logueado con otra cuenta": deja elegir entre conservar la
 * invitación en el mail original o asignarla a la cuenta logueada.
 */
const AccountChoiceView = ({
	invitation,
	token,
	currentEmail,
	onKeepOriginal,
}: AccountChoiceViewProps) => {
	const navigate = useNavigate();
	const [migrating, setMigrating] = useState(false);
	const startedRef = useRef(false);

	const handleMigrate = async () => {
		if (startedRef.current) return;
		startedRef.current = true;
		setMigrating(true);

		try {
			await migrateInvitation(token);
			const invitationBanner: InvitationBannerData = {
				tournamentName: invitation.tournament.name,
				tournamentCode: invitation.tournament.code,
				role: invitation.role,
			};
			navigate("/dashboard", { state: { invitationBanner } });
		} catch (err: any) {
			errorToast(err.message || "No se pudo migrar la invitación.");
			setMigrating(false);
			startedRef.current = false;
		}
	};

	return (
		<InvitationCard invitation={invitation}>
			<span className="flex text-neutrallight text-lg">
				<Info size={32} className="text-yellow" />	
				Vemos que has iniciado sesión con una cuenta diferente. Podés
				asignar esta invitación a cualquiera de las dos cuentas.
			</span>

			<div className="grid grid-cols-2 w-full gap-2">
				<Button
					type="button"
					variant="secondary"
					onClick={onKeepOriginal}
					disabled={migrating}
					iconLeft={<ChevronRight size={29} className="text-orange"/>}
				>
					<>Conservar original <span className="italic font-light text-muted group-hover:text-muted-900 group-hover:font-light ml-[10px]" >{`(${invitation.invitee.email})`}</span></>
				</Button>
				<Button
					type="button"
					variant="secondary"
					onClick={handleMigrate}
					disabled={migrating}
					iconLeft={<ChevronRight size={29} className="text-orange"/>}
				>
					{migrating ? "Migrando..." : 
					<>Asignar a cuenta actual<span className="italic font-light text-muted group-hover:text-muted-900 group-hover:font-light ml-[10px]" >{`(${currentEmail})`}</span></>}
				</Button>
			</div>
		</InvitationCard>
	);
};

export default AccountChoiceView;
