import BeltIcon from "@/components/BeltIcon";
import {
	competitorSchema,
	CompetitorSchema,
} from "@/types/schemas/primitiveSchemas";
import { getRankName } from "@/utils/utils";
import dayjs from "dayjs";

interface CompetitorsListProps {
	competitors: CompetitorSchema[];
	loading: boolean;
	selectCompetitor: React.Dispatch<React.SetStateAction<CompetitorSchema>>;
	selectedCompetitor: CompetitorSchema;
}

const CompetitorsList = ({
	competitors,
	loading,
	selectCompetitor,
	selectedCompetitor,
}: CompetitorsListProps) => {
	return (
		<div className="bg-elevated flex flex-col gap-2 shadow-lg justify-center create-tournament-card p-3 rounded-lg">
			<h1 className="font-extrabold text-2xl">Competidores</h1>
			<div className="flex flex-col gap-1">
				{loading ? (
					<div> Cargando competidores</div>
				) : (
					competitors.map((competitor, i) => (
						<div
							key={`${i}-category`}
							className={`grid grid-cols-4 px-2 py-0.5 rounded-lg transition-all ease-fluid cursor-pointer justify-items-center items-center font-bold border-1 ${
								selectedCompetitor?.uuid === competitor.uuid
									? "border-orange"
									: "border-transparent"
							} hover:border-orange`}
							onClick={() => selectCompetitor(competitor)}
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
					className={`grid grid-cols-4 px-2 py-0.5 rounded-lg transition-all ease-fluid cursor-pointer justify-items-center items-center font-bold border-1 border-transparent
					 hover:border-orange`}
					onClick={() => selectCompetitor(competitorSchema.parse({}))}
				>
					{/* Fullname */}
					<div className="flex items-center col-span-2 justify-start w-full gap-1">
						<div className="font-black capitalize">Rollback</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CompetitorsList;
