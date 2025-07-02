import { errorToast } from "@/services/toasts";
import { getUserCompetitors } from "@/services/userService";
import { useTournamentStore } from "@/states/useTournamentStore";
import {
	competitorSchema,
	CompetitorSchema,
} from "@/types/schemas/primitiveSchemas";
import { useEffect, useState } from "react";
import EditCompetitor from "./EditCompetitor";
import CompetitorsList from "./CompetitorsList";
import CreateCompetitor from "./CreateCompetitor";

// interface ManageCompetitorsProps {
//     category: categorySchema;
//     competitors: CompetitorSchema[];
// }

// const ManageCompetitors = ({ category, competitors }: ManageCompetitorsProps) => {
const ManageCompetitors = () => {
	const [loading, setLoading] = useState(false);
	const [userCompetitors, setUserCompetitors] = useState<CompetitorSchema[]>(
		[]
	);
	const [selectedCompetitor, setSelectedCompetitor] =
		useState<CompetitorSchema>(competitorSchema.parse({}));

	const { tournament } = useTournamentStore();

	useEffect(() => {
		let isMounted = true;
		const fetchCompetitors = async () => {
			try {
				const res = await getUserCompetitors(tournament.code);
				console.log(res);
				const competitors = competitorSchema.array().parse(res);
				if (isMounted) setUserCompetitors(competitors);
			} catch (error) {
				console.error("Error al obtener torneos:", error);
				errorToast(
					"Ha ocurrido un error al obtener los torneos, por favor recarga la página."
				);
			} finally {
				if (isMounted) setLoading(false);
			}
		};

		fetchCompetitors();

		return () => {
			isMounted = false; // cleanup para evitar memory leaks
		};
	}, []);
	return (
		<div className="grid grid-cols-5 gap-2">
			<div className="col-span-3">
				{selectedCompetitor.user.firstname === "" ? (
					<CreateCompetitor />
				) : (
					<EditCompetitor competitor={selectedCompetitor} />
				)}
			</div>
			<div className="col-span-2">
				<CompetitorsList
					competitors={userCompetitors}
					loading={loading}
					selectCompetitor={setSelectedCompetitor}
					selectedCompetitor={selectedCompetitor}
				/>
			</div>
		</div>
	);
};

export default ManageCompetitors;
