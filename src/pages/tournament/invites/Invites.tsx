"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GoBack from "@/components/GoBack";
import TournamentNavbar from "@/components/TournamentNavbar";
import Button from "@/components/Button";
import { useTournamentStore } from "@/states/useTournamentStore";
import { errorToast, successToast } from "@/services/toasts";
import { Role, TournamentActions } from "@/types/enums";
import { CiClock2 } from "react-icons/ci";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { LuCopy, LuUserPlus, LuLink2 } from "react-icons/lu";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { ManageInvitesProvider, useManageInvites } from "./InvitesContext";
import FormInput from "@/components/forms/FormInput";
import { FaLink } from "react-icons/fa";
import InvitedInstructorsList from "./components/InvitedInstructorsList";
import { getInvitees } from "@/services/tournament/invitationService";
import { inviteeSchema, InviteeSchemaT } from "./schemas";
import { InviteeT } from "./types";

type MasterStatus = "PENDIENTE" | "ACEPTADO";

type MasterInvite = {
	id: number;
	name: string;
	lastName: string;
	email: string;
	status: MasterStatus;
	instructorsInvited: number;
	competitors: number;
};

const STATUS_TEXT: Record<MasterStatus, string> = {
	PENDIENTE: "Pendiente",
	ACEPTADO: "Aceptado",
};

const masterInvitesMock: MasterInvite[] = [
	{
		id: 1,
		name: "Ricardo",
		lastName: "Rieiro",
		email: "rrieiro@atra.com",
		status: "PENDIENTE",
		instructorsInvited: 2,
		competitors: 18,
	},
	{
		id: 2,
		name: "Marcelo",
		lastName: "Vatrano",
		email: "mvatrano@atra.com",
		status: "ACEPTADO",
		instructorsInvited: 6,
		competitors: 60,
	},
];

const tokenizedInviteLink = "https://tkdfast.com/?invite_token=eyBx3B4h9Eo2fX3";

const statusIcon = (status: MasterStatus) => {
	if (status === "ACEPTADO") {
		return <IoCheckmarkCircleOutline className="text-green" size={18} />;
	}

	return <CiClock2 className="text-yellow" size={18} />;
};

const Invites = () => {
	const { tournament } = useTournamentStore();
	const { can } = useTournamentStore();
	const {invitedInstructors} = useManageInvites();
	const [selectedMasterId, setSelectedMasterId] = useState<number>(
		masterInvitesMock[1]?.id ?? masterInvitesMock[0]?.id ?? 0
	);
	const [formValues, setFormValues] = useState({
		name: "",
		lastName: "",
		email: "",
	});

	const canInviteMaster = can(TournamentActions.INVITE_MASTER);
	const canInviteInstructor = can(TournamentActions.INVITE_INSTRUCTOR);

	const [instructors, setInstructors] = useState<InviteeSchemaT[]>()

	const selectedMaster = useMemo(
		() => masterInvitesMock.find((master) => master.id === selectedMasterId),
		[selectedMasterId]
	);

	const handleInviteMaster = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!formValues.name || !formValues.lastName || !formValues.email) {
			errorToast("Completá nombre, apellido y email para invitar.");
			return;
		}

		successToast("Invitación enviada (demo).");
		setFormValues({ name: "", lastName: "", email: "" });
	};

	const handleCopyInviteLink = async () => {
		try {
			await navigator.clipboard.writeText(tokenizedInviteLink);
			successToast("Link copiado al portapapeles.");
		} catch {
			errorToast("No se pudo copiar el link.");
		}
	};

	// useEffect(() => {
	// 	let isMounted = true;
	// 	const fetchInvitees = async () => {
	// 		try {
	// 			// API fetch
	// 			const res = await getInvitees(tournament.code, Role.INSTRUCTOR);
	// 			console.log(res)
	// 			const inviteesRes = inviteeSchema.array().parse(res);
	// 			if (isMounted) setInstructors(inviteesRes);
	// 		} catch (error) {
	// 			console.log(error.issues)
	// 			errorToast(
	// 				"Ha ocurrido un error al obtener los invitados, por favor recarga la página."
	// 			);
	// 		}
	// 	};

	// 	fetchInvitees();

	// 	return () => {
	// 		isMounted = false; // cleanup para evitar memory leaks
	// 	};
	// }, []);


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
					<div className="bg-elevated rounded-lg p-3 shadow-lg flex flex-col gap-3">
						{canInviteMaster ? (
							<section className="flex flex-col gap-2">
									<h2 className="text-2xl font-extrabold">Maestros</h2>
									<p className="text-muted text-sm max-w-3xl">
										Los maestros pueden generar su propio link de invitación de instructores
										e inscribir a sus propios competidores.
									</p>

										<div className="bg-super-elevated rounded-lg p-1.5 border border-elevated-400">
											{masterInvitesMock.map((master) => {
												const isSelected = selectedMasterId === master.id;

												return (
													<div
														key={master.id}
														onClick={() => setSelectedMasterId(master.id)}
														className={`flex justify-between w-full gap-1 text-left px-1.5 py-1 border-b border-elevated-400 transition-colors ${
															isSelected ? "bg-elevated rounded" : "hover:bg-elevated/60"
														}`}
													>
														<span className="md:col-span-4">
															{master.name} {master.lastName}
														</span>
														<span className="md:col-span-4 text-muted italic">
															{master.email}
														</span>
														<span className="md:col-span-4 inline-flex items-center gap-0.5">
															{statusIcon(master.status)}
															{STATUS_TEXT[master.status]}
														</span>
													</div>
												);
											})}

											<form
												onSubmit={handleInviteMaster}
												className="grid grid-cols-3 md:grid-cols-12 gap-1.5 px-1.5 pt-1"
											>
												<FormInput 
													name="name"
													variant="primary"
													value={formValues.name}
													onChange={(event) =>
														setFormValues((prev) => ({ ...prev, lastName: event.target.value }))
													}
													// title="Nombre"
													placeholder="Nombre"
												/>
												<FormInput 
													name="lastname"
													variant="primary"
													value={formValues.lastName}
													onChange={(event) =>
														setFormValues((prev) => ({ ...prev, lastName: event.target.value }))
													}
													// title="Nombre"
													placeholder="Apellido"
												/>
												<FormInput 
													name="email"
													type="email"
													variant="primary"
													value={formValues.email}
													onChange={(event) =>
														setFormValues((prev) => ({ ...prev, lastName: event.target.value }))
													}
													// title="Nombre"
													placeholder="email"
												/>
												<Button type="submit" className="w-full col-span-3 md:w-auto px-2.5">
													<span className="inline-flex items-center gap-0.5 text-xs">
														<LuUserPlus size={13} />
														Invitar
													</span>
												</Button>
											</form>
										</div>

								</section>
						) : null}

						{canInviteInstructor ? (
							<section className="flex flex-col gap-2.5">
								<h2 className="text-2xl font-extrabold">Invitar Instructores</h2>
								<p className="text-muted text-sm max-w-3xl">
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
					<div className="bg-elevated rounded-lg p-3 shadow-lg flex flex-col gap-1.5">
						<h3 className="text-2xl font-extrabold">Información de maestro</h3>

						{selectedMaster ? (
							<div className="grid grid-cols-2 gap-y-1 text-sm">
									<span className="text-muted">Nombre:</span>
									<span>{selectedMaster.name} {selectedMaster.lastName}</span>

									<span className="text-muted">Email:</span>
									<span className="italic">{selectedMaster.email}</span>

									<span className="text-muted">Status:</span>
									<span className="inline-flex items-center gap-0.5">
										{statusIcon(selectedMaster.status)}
										{STATUS_TEXT[selectedMaster.status]}
									</span>

									<span className="text-muted">Instructores Invitados:</span>
									<span>{selectedMaster.instructorsInvited}</span>

									<span className="text-muted">Competidores:</span>
									<span>{selectedMaster.competitors}</span>
								</div>
						) : (
							<p className="text-muted">Seleccioná un maestro para ver su información.</p>
						)}
					</div>
				</div>
			</main>

			<Footer />
		</div>
	);
};

export default Invites;
