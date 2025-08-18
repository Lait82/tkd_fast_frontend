import { useManageCompetitors } from "./ManageCompetitorContext";
import { ManageCompetitorModes, ManageCompetitorTypes } from "@/types/enums";
import BoxingGlovesAdd from "@/components/icons/BoxingGlovesAdd";

const TeamsList = () => {
	const {
		setTeamDraft,
		setMode,
		setManageType,
		manageType,
		mode,
		setSelectedCategories,
		teams,
	} = useManageCompetitors();
	return (
		<>
			{teams.map((team) => {
				return (
					<div
						className="flex justify-between transition-all ease-fluid rounded-lg px-1 py-0.5 cursor-pointer capitalize border border-transparent hover:border-orange"
						key={team.uuid}
						onClick={() => {
							setTeamDraft(team);
							setMode(ManageCompetitorModes.EDIT);
							setManageType(ManageCompetitorTypes.TEAM);
						}}
					>
						<span className="text-lg">{team.name}</span>
						<span>{`${team.competitors.length} Competidores`}</span>
					</div>
				);
			})}
			<div
				className={`px-1 py-0.5 rounded-lg transition-all ease-fluid cursor-pointer justify-items-center items-center font-bold border-1 border-transparent
					 hover:border-orange`}
				onClick={() => {
					if (mode === ManageCompetitorModes.EDIT)
						setMode(ManageCompetitorModes.CREATE);
					if (manageType === ManageCompetitorTypes.COMPETITOR)
						setManageType(ManageCompetitorTypes.TEAM);

					// setTeamDraft(competitorSchema.parse({}));
					setSelectedCategories([]);
				}}
			>
				{/* Fullname */}
				<div className="flex items-center justify-start w-full gap-1">
					<div className="flex gap-2 items-center capitalize text-muted italic">
						<BoxingGlovesAdd size={5} />
						Crear nuevo equipo
					</div>
				</div>
			</div>
		</>
	);
};

export default TeamsList;
