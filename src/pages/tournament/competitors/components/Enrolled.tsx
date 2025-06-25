import RoleBadge from "@/components/forms/RoleBadge";
import { Role } from "@/types/enums";
import { getHighestRole } from "@/utils/utils";
import dayjs from "dayjs";
import { Edit } from "lucide-react";
import Category from "./Category";
import { useEffect, useState } from "react";
import { getCompetitorsByCategory } from "@/services/tournamentService";
import { useTournamentStore } from "@/states/useTournamentStore";
import {
	CompetitorsByCategoryResponseSchema,
	competitorsByCategoryResponseSchema,
} from "@/types/schemas";

const Enrolled = () => {
	const { tournament } = useTournamentStore();
	const [categoriesWithCompetitors, setCategoriesWithCompetitors] =
		useState<CompetitorsByCategoryResponseSchema>([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		let isMounted = true;
		const fetchCategoriesWCompetitors = async () => {
			try {
				const res = await getCompetitorsByCategory(tournament.code);
				const competitorsByCategory =
					competitorsByCategoryResponseSchema.parse(res);
				console.log(competitorsByCategory);
				if (isMounted)
					setCategoriesWithCompetitors(competitorsByCategory);
			} catch (error) {
				console.error(
					"Error al obtener categorias/competidores:",
					error
				);
			} finally {
				if (isMounted) setLoading(false);
			}
		};

		fetchCategoriesWCompetitors();

		return () => {
			isMounted = false;
		};
	}, []);
	return (
		<div className="bg-elevated flex flex-col gap-2 shadow-lg justify-center create-tournament-card p-3 rounded-lg">
			<h1 className="font-extrabold text-2xl">Competidores</h1>
			<div className="flex flex-col gap-3">
				{categoriesWithCompetitors.map((categoryWComp, i) =>
					loading ? (
						<div> Cargando competidores</div>
					) : (
						<Category
							key={`category-${i}`}
							category={categoryWComp.category}
							competitors={categoryWComp.competitors}
						/>
					)
				)}
			</div>
		</div>
	);
};

export default Enrolled;
