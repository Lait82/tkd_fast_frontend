import Category from "./Category";
import { useEffect, useState } from "react";
import { getCompetitorsByCategory } from "@/services/tournamentService";
import { useTournamentStore } from "@/states/useTournamentStore";
import {
	CompetitorsByCategoryResponseSchema,
	competitorsByCategoryResponseSchema,
} from "@/types/schemas";
import { errorToast } from "@/services/toasts";

const EnrolledCompetitors = () => {
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
				errorToast("Error al obtener categorias/competidores.");
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

export default EnrolledCompetitors;
