import BeltIcon from "@/components/icons/BeltIcon";
import {
	competitorSchema,
	CompetitorSchema,
} from "@/types/schemas/primitiveSchemas";
import dayjs from "dayjs";
import { useManageCompetitors } from "./ManageCompetitorContext";
import { useEffect, useState } from "react";
import { ManageCompetitorModes, ManageCompetitorTypes } from "@/types/enums";
import { RiBoxingFill } from "react-icons/ri";
import BoxingGlovesAdd from "@/components/icons/BoxingGlovesAdd";
import TeamsList from "./TeamsList";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import BoxingGloves from "@/components/icons/BoxingGloves";

const CompetitorsList = ({ maxHeight }: { maxHeight: number }) => {
	const {
		userCompetitors,
		competitorDraft,
		setCompetitorDraft,
		mode,
		setMode,
		setSelectedCategories,
		manageType,
		setManageType,
	} = useManageCompetitors();

	const [loading, setLoading] = useState<boolean>(true);

	const handleClick = (competitor: CompetitorSchema) => {
		if (manageType !== ManageCompetitorTypes.COMPETITOR)
			setManageType(ManageCompetitorTypes.COMPETITOR);
		if (mode !== ManageCompetitorModes.VIEW)
			setMode(ManageCompetitorModes.VIEW);
		setCompetitorDraft(competitor);
		setSelectedCategories([]);
	};
	useEffect(() => {
		if (userCompetitors) setLoading(false);
	}, []);

	return (
		<TabGroup
			as="div"
			style={{ maxHeight }}
			className="bg-elevated flex flex-col min-h-0 gap-2 shadow-lg justify-center p-3 rounded-lg"
		>
			<TabList className="flex justify-around">
				<Tab className="rounded-full px-1 transition-all ease-fluid py-0.5 outline-0 data-hover:bg-super-elevated data-selected:bg-super-elevated">
					<h1 className="font-extrabold cursor-pointer flex gap-1 items-center text-2xl">
						<RiBoxingFill /> Competidores
					</h1>
				</Tab>
				<Tab className="rounded-full px-1 transition-all ease-fluid py-0.5 outline-0 data-hover:bg-super-elevated data-selected:bg-super-elevated">
					<h1 className="font-extrabold cursor-pointer flex gap-1 items-center text-2xl">
						<BoxingGloves size={20} /> Equipos
					</h1>
				</Tab>
			</TabList>
			<TabPanels className="overflow-y-auto flex-1 pr-1">
				<TabPanel className="flex flex-col gap-1">
					{loading ? (
						<div> Cargando competidores</div>
					) : (
						userCompetitors.map((competitor, i) => (
							<div
								key={`${i}-category`}
								className={`grid grid-cols-4 px-1 py-0.5 rounded-lg transition-all ease-fluid cursor-pointer justify-items-center items-center font-bold border-1 ${
									manageType ===
										ManageCompetitorTypes.COMPETITOR &&
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
										)}${competitor.user.lastname.charAt(
											0
										)}`}
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
							if (mode !== ManageCompetitorModes.CREATE)
								setMode(ManageCompetitorModes.CREATE);
							if (manageType !== ManageCompetitorTypes.COMPETITOR)
								setManageType(ManageCompetitorTypes.COMPETITOR);

							setCompetitorDraft(competitorSchema.parse({}));
							setSelectedCategories([]);
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
				</TabPanel>
				<TabPanel className="flex flex-col gap-1">
					<TeamsList />
				</TabPanel>
			</TabPanels>
		</TabGroup>
	);
};

export default CompetitorsList;
