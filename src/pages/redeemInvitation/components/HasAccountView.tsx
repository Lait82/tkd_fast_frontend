import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/states/useAuthStore";
import { errorToast } from "@/services/toasts";
import InvitationCard from "./InvitationCard";
import { InvitationPreview, redeemResponseSchema } from "../lib/schemas";
import { userSchema } from "@/types/schemas/primitiveSchemas";
import { redeemInvitation } from "../lib/services";
import { useCountdown } from "../lib/useCountdown";
import { REDIRECT_SECONDS } from "../lib/format";
import Button from "@/components/Button";
import { ChevronRight } from "lucide-react";

interface HasAccountViewProps {
	invitation: InvitationPreview;
	token: string;
}

/**
 * Vista "tiene cuenta": el link funciona como magic link. Canjea la
 * invitación, guarda la sesión y redirige al dashboard.
 */
const HasAccountView = ({ invitation, token }: HasAccountViewProps) => {
	const navigate = useNavigate();
	const setSession = useAuthStore((s) => s.setSession);
	const [redeeming, setRedeeming] = useState(false);
	const startedRef = useRef(false);

	const doRedeem = async () => {
		if (startedRef.current) return;
		startedRef.current = true;
		setRedeeming(true);

		try {
			const raw = await redeemInvitation(token);
			const res = redeemResponseSchema.parse(raw);
			const user = userSchema.parse(res.user);
			setSession(res.access_token, user);
			navigate("/dashboard");
		} catch (err: any) {
			errorToast(err.message || "No se pudo procesar la invitación.");
			setRedeeming(false);
			startedRef.current = false;
		}
	};

	const remaining = useCountdown(REDIRECT_SECONDS, doRedeem, !redeeming);

	return (
		<InvitationCard invitation={invitation}>
			<p className="text-lg">
				Fuiste invitado como{" "}
				<span className="font-semibold text-neutrallight">
					{invitation.role.toLowerCase()}
				</span>{" "}
				a participar de este torneo. Inicia sesion para ser redirigido al dashboard
			</p>

			{!redeeming && (
				<span className="text-sm text-muted">
					Redirigiéndote en {remaining}...
				</span>
			)}

			<Button
				type="button"
				variant="secondary"
				className="px-3"
				onClick={doRedeem}
				disabled={redeeming}
			>
				<ChevronRight className="text-orange"/>	
				{redeeming ? "Ingresando..." : "Inicia Sesión"}
			</Button>
		</InvitationCard>
	);
};

export default HasAccountView;
