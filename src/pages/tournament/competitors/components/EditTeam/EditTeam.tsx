import { useManageCompetitors } from "../ManageCompetitorContext";
import SelectTeamCompetitors from "./SelectTeamCompetitors/SelectTeamCompetitors";
import MemberCompetitor from "./MemberCompetitor";
import { UserPlus } from "lucide-react";
import Button from "@/components/Button";
import { errorToast, successToast } from "@/services/toasts";
import {
	addCompetitorsToTeamResponse,
	addCompetitorsToTeamPayload,
} from "@/types/schemas/teamServiceSchemas";
import { addCompetitorToTeam } from "@/services/teamService";
import { useEffect, useState } from "react";

const EditTeam = ({}) => {
	const {
		teamDraft,
		selectedMembers,
		setSelectedMembers,
		userCompetitors,
		updateCompetitorsList,
		updateTeamsList,
	} = useManageCompetitors();

	const [teamCompetitors, setTeamCompetitors] = useState(
		userCompetitors.filter((comp) =>
			teamDraft.competitors.some((member) => member === comp.uuid)
		)
	);
	useEffect(() => {
		setTeamCompetitors(
			userCompetitors.filter((comp) =>
				teamDraft.competitors.some((member) => member === comp.uuid)
			)
		);
	}, [teamDraft, userCompetitors]);
	const canAddCompetitor =
		teamCompetitors.length + selectedMembers.length <
		userCompetitors.length;

	const handleAddCompetitors = async () => {
		try {
			const formData = {
				competitor_uuids: selectedMembers.map((sm) => sm.uuid),
			};
			const result = addCompetitorsToTeamPayload.safeParse(formData);
			if (!result.success) {
				// Mostrar errores al usuario
				console.log(result.error);
				return;
			}

			const addCompetitorsResponse = await addCompetitorToTeam(
				teamDraft.uuid,
				result.data
			);
			const res = addCompetitorsToTeamResponse.parse(
				addCompetitorsResponse
			);

			// Reset and update components states.
			updateCompetitorsList(res.competitors);
			updateTeamsList(res.team);

			setSelectedMembers([]);

			successToast("Competidores agregados exitosamente.");
		} catch (error: any) {
			errorToast(error.message);
			errorToast(
				"Hubo un error al agrear el/los competidores al equipo."
			);
		}
	};
	return (
		<div className="bg-elevated flex flex-col gap-2 shadow-lg justify-center p-3 rounded-lg">
			<div className="flex flex-col gap-3">
				<h1 className="font-extrabold text-2xl">Editar equipo</h1>
				<div className="flex gap-2">
					<div
						className="flex-shrink-0 flex rounded-full justify-center uppercase items-center bg-background text-orange text-5xl"
						style={{
							height: "130px",
							width: "130px",
						}}
					>
						{`${teamDraft.name
							.split(" ")
							.slice(0, 3)
							.map((word) => word.charAt(0))
							.join("")}`}
					</div>
					<div className="grid grid-cols-2 gap-2 flex-1 items-center">
						<div className="flex items-center gap-1">
							<span className="text-muted">Nombre</span>
							{teamDraft.name}
						</div>
					</div>
				</div>
				<h1 className="font-extrabold text-2xl">Miembros</h1>
				<div className="flex flex-col gap-1 overflow-y-auto flex-1 pr-1">
					{teamCompetitors.map((competitor) => {
						return (
							<MemberCompetitor
								key={competitor.uuid}
								competitor={competitor}
							/>
						);
					})}
					{selectedMembers.map((member) => (
						<SelectTeamCompetitors
							key={member.id}
							id={member.id}
							value={member.uuid}
						/>
					))}
					{canAddCompetitor && (
						<div
							className={`flex gap-1 px-1 py-0.5 cursor-pointer rounded-lg italic text-muted border border-transparent hover:border-orange transition-all ease-fluid justify-items-center items-center font-bold`}
							onClick={() => {
								setSelectedMembers([
									...selectedMembers,
									{
										id: crypto.randomUUID(),
										uuid: "",
									},
								]);
							}}
						>
							<UserPlus size={30} />
							Agregar nuevo competidor
						</div>
					)}
				</div>
				{selectedMembers.length &&
				selectedMembers.every((sm) => sm.uuid.length > 10) ? (
					<div className="flex w-full justify-end">
						<Button
							onClick={handleAddCompetitors}
							iconLeft={<UserPlus />}
						>
							Agregar Competidores
						</Button>
					</div>
				) : null}
			</div>
		</div>
	);
};

export default EditTeam;
