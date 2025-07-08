import BeltIcon from "@/components/BeltIcon";
import {
	competitorSchema,
	CompetitorSchema,
} from "@/types/schemas/primitiveSchemas";
import dayjs from "dayjs";
import { useManageCompetitors } from "./ManageCompetitorContext";
import { useState } from "react";
import { ManageCompetitorModes } from "@/types/enums";
import { RiBoxingFill } from "react-icons/ri";
import BoxingGlovesAdd from "@/components/icons/BoxingGlovesAdd";

const CompetitorsList = () => {
	const {
		userCompetitors,
		competitorDraft,
		setCompetitorDraft,
		mode,
		setMode,
	} = useManageCompetitors();

	const [loading, setLoading] = useState<boolean>(true);

	const handleClick = (competitor: CompetitorSchema) => {
		if (mode === ManageCompetitorModes.CREATE)
			setMode(ManageCompetitorModes.EDIT);
		setCompetitorDraft(competitor);
	};
	setTimeout(() => {
		setLoading(false);
	}, 2000);
	return (
		<div className="bg-elevated flex flex-col gap-2 shadow-lg justify-center create-tournament-card p-3 rounded-lg">
			<h1 className="font-extrabold flex gap-1 items-center text-2xl">
				<RiBoxingFill /> Competidores
			</h1>
			<div className="flex flex-col gap-1">
				{loading ? (
					<div> Cargando competidores</div>
				) : (
					userCompetitors.map((competitor, i) => (
						<div
							key={`${i}-category`}
							className={`grid grid-cols-4 px-1 py-0.5 rounded-lg transition-all ease-fluid cursor-pointer justify-items-center items-center font-bold border-1 ${
								competitorDraft?.uuid === competitor.uuid
									? "border-orange"
									: "border-transparent"
							} hover:border-orange`}
							onClick={() => handleClick(competitor)}
						>
							{/* Fullname */}
							<div className="flex items-center col-span-2 justify-start w-full gap-1">
								<div className="rounded-full font-black items-center bg-background flex h-3 w-3 justify-center text-orange uppercase">
									{`${competitor.user.firstname.charAt(
										0
									)}${competitor.user.lastname.charAt(0)}`}
								</div>
								<div className="font-semibold capitalize">{`${competitor.user.firstname} ${competitor.user.lastname}`}</div>
							</div>

							{/* Rank */}
							<div className="flex items-center justify-center w-full gap-1">
								<BeltIcon
									key={`${i}-belt`}
									rank={competitor.user.rank}
								/>
							</div>

							{/* Age */}
							<div>
								{dayjs()
									.diff(competitor.user.dob, "years")
									.toString()}{" "}
								Años
							</div>
						</div>
					))
				)}

				<div
					className={`px-1 py-0.5 rounded-lg transition-all ease-fluid cursor-pointer justify-items-center items-center font-bold border-1 border-transparent
					 hover:border-orange`}
					onClick={() => {
						setMode(ManageCompetitorModes.CREATE);
						setCompetitorDraft(competitorSchema.parse({}));
					}}
				>
					{/* Fullname */}
					<div className="flex items-center justify-start w-full gap-1">
						<div className="flex gap-2 items-center capitalize text-muted italic">
							<BoxingGlovesAdd size={5} />
							Agregar nuevo competidor
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CompetitorsList;
