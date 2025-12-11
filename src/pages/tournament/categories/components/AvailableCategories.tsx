import { getAvailableCategories } from "@/services/categoryService";
import { errorToast } from "@/services/toasts";
import { useTournamentStore } from "@/states/useTournamentStore";
import { categorySchema, CategorySchema } from "@/types/schemas/primitiveSchemas";
import { useEffect, useState } from "react";
import SingleCategory from "./SingleCategory";

const AvailableCategories = () => {
    const [availableCategories, setAvailableCategories] = useState<CategorySchema[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { tournament } = useTournamentStore();

    useEffect(() => {
        let isMounted = true;
        const fetchCategoriesWCompetitors = async () => {
            try {
                const res = await getAvailableCategories(tournament.code);
                const categories =
                    categorySchema.array().parse(res);
                if (isMounted)
                    setAvailableCategories(categories);
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
		<div className="bg-elevated flex flex-col gap-2 shadow-lg justify-center p-3 rounded-lg">
			<h1 className="font-extrabold text-3xl">Categorias</h1>
			<div className="flex flex-col gap-3">
				{availableCategories.map((category, i) =>
					loading ? (
						<div> Cargando competidores...</div>
					) : (
						<SingleCategory
							key={`av-category-${i}`}
							category={category}
						/>
					)
				)}
			</div>
		</div>
	);
}

export default AvailableCategories;