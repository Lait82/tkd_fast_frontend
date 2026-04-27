"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GoBack from "@/components/GoBack";
import TournamentNavbar from "@/components/TournamentNavbar";
import Button from "@/components/Button";
import { useTournamentStore } from "@/states/useTournamentStore";
import { errorToast, successToast } from "@/services/toasts";
import { TournamentActions } from "@/types/enums";
import { LuCopy } from "react-icons/lu";
import { useManageInvites } from "./InvitesContext";
import { FaLink } from "react-icons/fa";
import InvitedInstructorsList from "./components/InvitedInstructorsList";
import InviteeInfo from "./components/InviteeInfo";
import InvitedMastersList from "./components/InvitedMastersList";

const tokenizedInviteLink = "https://tkdfast.com/?invite_token=eyBx3B4h9Eo2fX3";


const Invites = () => {
	const { can } = useTournamentStore();
	const {invitedInstructors, invitedMasters} = useManageInvites();
	const canInviteMaster = can(TournamentActions.INVITE_MASTER);
	const canInviteInstructor = can(TournamentActions.INVITE_INSTRUCTOR);

	const handleCopyInviteLink = async () => {
		try {
			await navigator.clipboard.writeText(tokenizedInviteLink);
			successToast("Link copiado al portapapeles.");
		} catch {
			errorToast("No se pudo copiar el link.");
		}
	};

	return (
		<div className="create-tournament-page">
			<Header />

			<main className="create-tournament-container flex flex-col gap-2">
				<div className="grid grid-cols-3 items-center">
					<GoBack />
					<div className="flex justify-center w-full col-span-2 md:col-span-1 md:col-start-2">
						<TournamentNavbar />
					</div>
				</div>

				<div className="grid grid-cols-[7fr_3fr] gap-2 items-start">
					{/* Invitees List */}	
					<div className="bg-elevated rounded-lg p-3 shadow-lg flex flex-col gap-5">
						{canInviteMaster ? (
							<section className="flex flex-col gap-2">
									<h2 className="text-2xl font-extrabold">Maestros</h2>
									<p className="text-muted text-sm max-w-3xl">
										Los maestros pueden generar su propio link de invitación de instructores
										e inscribir a sus propios competidores.
									</p>

									<InvitedMastersList masters={invitedMasters} />
								</section>
						) : null}

						{canInviteInstructor ? (
							<section className="flex flex-col gap-2.5">
								<h2 className="text-2xl font-extrabold">Invitar Instructores</h2>
								<p className="text-muted text-sm max-w-3xl pl-1.5">
									Recordá que los instructores solo pueden inscribir competidores,
									no pueden invitar a otros instructores.
								</p>

								{
									invitedInstructors &&
									<InvitedInstructorsList
										instructors={invitedInstructors}
									/>
								}

								<div className="w-full flex justify-center">
									<div className="flex flex-col justify-center gap-1">
										<span className="">Tu link de invitación es:</span>
										<div className="flex gap-2 justify-self-start">
											<div className="bg-super-elevated px-1 py-0.5 cursor-pointer rounded-lg inline-flex items-center gap-0.5  overflow-hidden border border-elevated-400" onClick={handleCopyInviteLink} >
												<FaLink className="text-orange shrink-0" />
												<span className="text-sm text-muted truncate" title={tokenizedInviteLink}>
													{tokenizedInviteLink}
												</span>
											</div>
											<Button
												type="button"
												variant="secondary"
												onClick={handleCopyInviteLink}
												className="w-fit px-2"
											>
												<span className="inline-flex items-center gap-0.5 text-xs">
													<LuCopy size={13} />
													Copiar
												</span>
											</Button>

										</div>
									</div>
								</div>
							</section>
						) : null}

						{!canInviteMaster && !canInviteInstructor ? (
							<div className="rounded-lg bg-super-elevated p-2 border border-elevated-400 text-muted">
								No tenés permisos para gestionar invitaciones.
							</div>
						) : null}
					</div>

					{/* Masters Info */}
					<InviteeInfo />
				</div>
			</main>

			<Footer />
		</div>
	);
};

export default Invites;
