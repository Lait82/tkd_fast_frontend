import { useNavigate } from "react-router-dom";
import InvitationCard from "./InvitationCard";
import { InvitationPreview } from "../lib/schemas";
import { useCountdown } from "../lib/useCountdown";
import { REDIRECT_SECONDS } from "../lib/format";
import Button from "@/components/Button";
import { ChevronRight } from "lucide-react";

interface NoAccountViewProps {
	invitation: InvitationPreview;
	token: string;
}

/**
 * Vista "sin cuenta": invita a registrarse con el mismo email. Tras un
 * timer redirige al signup, llevando el token y el email pre-cargados.
 */
const NoAccountView = ({ invitation, token }: NoAccountViewProps) => {
	const navigate = useNavigate();

	const goToSignup = () => {
		const params = new URLSearchParams({
			token,
			email: invitation.invitee.email,
		});
		navigate(`/signup?${params.toString()}`);
	};

	const remaining = useCountdown(REDIRECT_SECONDS, goToSignup);

	return (
		<InvitationCard invitation={invitation}>
			<span className="flex text-neutrallight text-lg">
				Creá una cuenta con este mismo mail donde recibiste la invitación
				para empezar a inscribir a tus competidores e invitar a tus
				instructores.
			</span>

			<span className="text-sm text-muted">
				Redirigiéndote en {remaining}...
			</span>

			<Button
				type="button"
				onClick={goToSignup}
				className="pl-2.5 pr-3"
			>
				<ChevronRight className="text-orange" />
				Regístrate
			</Button>
		</InvitationCard>
	);
};

export default NoAccountView;
