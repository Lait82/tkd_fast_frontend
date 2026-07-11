import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { FaExclamationTriangle } from "react-icons/fa";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomToaster from "@/components/CustomToaster";
import Button from "@/components/Button";
import { useAuthStore } from "@/states/useAuthStore";
import { useTournamentStore } from "@/states/useTournamentStore";
import { errorToast } from "@/services/toasts";
import "@/styles/Auth.css";
import { previewInvitation, migrateInvitation } from "./lib/services";
import { InvitationPreview, invitationPreviewSchema } from "./lib/schemas";
import { InvitationBannerData } from "@/pages/basicDashboard/components/InvitationBanner";
import HasAccountView from "./components/HasAccountView";
import NoAccountView from "./components/NoAccountView";
import AccountChoiceView from "./components/AccountChoiceView";
import InvitationCard from "./components/InvitationCard";

type Status = "loading" | "ready" | "error";

const RedeemInvitation = () => {
	const [searchParams] = useSearchParams();
	const token = searchParams.get("token") ?? "";
	const navigate = useNavigate();
	const { isAuthenticated, user, logout } = useAuthStore();
	const { resetTournamentStore } = useTournamentStore();

	const [status, setStatus] = useState<Status>("loading");
	const [error, setError] = useState<string | null>(null);
	const [invitation, setInvitation] = useState<InvitationPreview | null>(null);
	const [autoMigrateFailed, setAutoMigrateFailed] = useState(false);
	const autoMigrateStartedRef = useRef(false);

	useEffect(() => {
		let isMounted = true;

		if (!token) {
			setError("El enlace de invitación es inválido.");
			setStatus("error");
			return;
		}

		const load = async () => {
			try {
				const raw = await previewInvitation(token);
				const parsed = invitationPreviewSchema.parse(raw);
				if (!isMounted) return;
				setInvitation(parsed);
				setStatus("ready");
			} catch (err: any) {
				if (!isMounted) return;
				setError(err.message || "No se pudo cargar la invitación.");
				setStatus("error");
			}
		};

		load();
		return () => {
			isMounted = false;
		};
	}, [token]);

	// Logueado con el mismo mail que la invitación: no hay vista dedicada,
	// se migra (no-op del lado del backend, ya apunta a este usuario) y se
	// redirige directo al dashboard con el banner.
	const sameEmail =
		isAuthenticated &&
		!!user?.email &&
		!!invitation &&
		user.email.toLowerCase() === invitation.invitee.email.toLowerCase();

	useEffect(() => {
		if (
			status !== "ready" ||
			!invitation ||
			!sameEmail ||
			autoMigrateFailed
		) {
			return;
		}
		if (autoMigrateStartedRef.current) return;
		autoMigrateStartedRef.current = true;

		const run = async () => {
			try {
				await migrateInvitation(token);
				const invitationBanner: InvitationBannerData = {
					tournamentName: invitation.tournament.name,
					tournamentCode: invitation.tournament.code,
					role: invitation.role,
				};
				navigate("/dashboard", { state: { invitationBanner } });
			} catch (err: any) {
				errorToast(err.message || "No se pudo procesar la invitación.");
				setAutoMigrateFailed(true);
			}
		};

		run();
	}, [status, invitation, sameEmail, autoMigrateFailed, token, navigate]);

	const handleRetryAutoMigrate = () => {
		autoMigrateStartedRef.current = false;
		setAutoMigrateFailed(false);
	};

	// Necesario (no cosmético) para el caso en que el mail original no tenga
	// cuenta: /signup vive detrás de OnlyPublicRoute, que redirige a
	// /dashboard mientras isAuthenticated sea true. Sin cerrar sesión acá,
	// "Conservar" rebotaría de inmediato de vuelta al dashboard.
	const handleKeepOriginal = () => {
		resetTournamentStore();
		logout();
	};
	
	return (
		<div className="auth-page">
			<CustomToaster />
			<Header />
			<main className="flex flex-1 items-center justify-center p-4 pt-2">
				{status === "loading" && (
					<div className="flex flex-col items-center gap-3 text-muted">
						<Loader2 className="animate-spin" size={32} />
						<span>Cargando invitación...</span>
					</div>
				)}

				{status === "error" && (
					<div className="bg-elevated flex max-w-md flex-col items-center gap-4 rounded-lg p-8 text-center shadow-lg">
						<FaExclamationTriangle className="text-yellow" size={32} />
						<p className="text-neutrallight">{error}</p>
						<Button
							type="button"
							variant="secondary"
							className="w-full justify-center"
							onClick={() => navigate("/login")}
						>
							Ir a iniciar sesión
						</Button>
					</div>
				)}

				{status === "ready" &&
					invitation &&
					(!isAuthenticated 
						? (invitation.has_account 
							? <HasAccountView invitation={invitation} token={token} />
							: <NoAccountView invitation={invitation} token={token} />
						) 
						: sameEmail 
							?
								<InvitationCard invitation={invitation}>
								{autoMigrateFailed ? (
									<>
										<p className="text-muted">
											No pudimos procesar la invitación.
										</p>
										<Button
											type="button"
											variant="secondary"
											onClick={handleRetryAutoMigrate}
										>
											Reintentar
										</Button>
									</>
								) : (
									<div className="flex flex-col items-center gap-3 text-muted">
										<Loader2 className="animate-spin" size={32} />
										<span>Un momento, te estamos redirigiendo...</span>
									</div>
								)}
								</InvitationCard>
							: invitation.has_account 
								? <HasAccountView invitation={invitation} token={token} />
								: <AccountChoiceView
									invitation={invitation}
									token={token}
									currentEmail={user?.email ?? ""}
									onKeepOriginal={handleKeepOriginal}
								/>
							
					)
				}
			</main>
			<Footer />
		</div>
	);
};

export default RedeemInvitation;
