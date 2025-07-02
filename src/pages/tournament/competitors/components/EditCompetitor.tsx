import BeltIcon from "@/components/BeltIcon";
import { CompetitorSchema } from "@/types/schemas/primitiveSchemas";
import { getRankName } from "@/utils/utils";
import dayjs from "dayjs";

type EditCompetitorProps = {
	competitor: CompetitorSchema;
};

const EditCompetitor = ({ competitor }: EditCompetitorProps) => {
	return (
		<div className="bg-elevated flex flex-col gap-2 shadow-lg justify-center create-tournament-card p-3 rounded-lg">
			<div className="flex flex-col gap-3">
				<h1 className="font-extrabold text-2xl">
					Información Personal
				</h1>
				<div className="flex gap-2">
					<div
						className="flex-shrink-0 flex rounded-full justify-center items-center bg-background text-orange text-5xl"
						style={{
							height: "130px",
							width: "130px",
						}}
					>
						{`${competitor.user.firstname
							.charAt(0)
							.toUpperCase()}${competitor.user.lastname
							.charAt(0)
							.toUpperCase()}`}
					</div>
					<div className="grid grid-cols-2 gap-2 flex-1 items-center">
						<div className="flex items-center gap-1">
							<span className="text-muted">Nombre</span>
							{competitor.user.firstname}
						</div>
						<div className="flex items-center gap-1">
							<span className="text-muted">Graduación</span>
							<BeltIcon rank={competitor.user.rank} />
							{getRankName(competitor.user.rank)}
						</div>
						<div className="flex items-center gap-1">
							<span className="text-muted">
								Fecha de Nacimiento
							</span>
							{dayjs(competitor.user.dob).format("D MMMM YYYY")}
						</div>
						<div className="flex items-center gap-1">
							<span className="text-muted">DNI</span>
							{competitor.user.id_number}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditCompetitor;
