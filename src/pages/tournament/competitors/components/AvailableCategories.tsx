import {
	CategorySchema,
	competitorSchema,
} from "@/types/schemas/primitiveSchemas";
import { useEffect, useState } from "react";
import { useManageCompetitors } from "./ManageCompetitorContext";
import { BiCategoryAlt } from "react-icons/bi";
import Button from "@/components/Button";
import { CategoryStatus, ManageCompetitorModes } from "@/types/enums";
import EnrollableCategory from "./EnrollableCategory";
import EnrolledCategory from "./EnrolledCategory";
import { errorToast, successToast } from "@/services/toasts";
import { enrollCompetitor } from "@/services/tournamentService";
import { useTournamentStore } from "@/states/useTournamentStore";

interface CategoryWithStatus {
	status: CategoryStatus;
	category: CategorySchema;
}

const AvailableCategories = () => {
	const { tournament } = useTournamentStore();
	const [loading, setLoading] = useState<boolean>(true);
	const {
		competitorDraft,
		categories,
		competitorCategoriesDraft,
		setCompetitorDraft,
		setCompetitorCategoriesDraft,
		mode,
	} = useManageCompetitors();
	const [enrolledCategories, setEnrolledCategories] = useState<
		CategoryWithStatus[]
	>([]);
	const [enrollableCategories, setEnrollableCategories] = useState<
		CategoryWithStatus[]
	>([]);
	useEffect(() => {
		let isMounted = true;

		const enrolledCategoriesPayload: CategoryWithStatus[] = [];
		const enrollableCategoriesPayload: CategoryWithStatus[] = [];

		categories.forEach((category: CategorySchema) => {
			const isEnrolled = competitorDraft.inscriptions.some(
				(compInscription) =>
					compInscription.category_uuid === category.uuid
			);
			const arr = isEnrolled
				? enrolledCategoriesPayload
				: enrollableCategoriesPayload;
			arr.push({
				status: isEnrolled
					? CategoryStatus.UNAVAILABLE
					: CategoryStatus.AVAILABLE,
				category: category,
			});
		});

		if (isMounted) {
			setEnrolledCategories(enrolledCategoriesPayload);
			setEnrollableCategories(enrollableCategoriesPayload);
		}

		setLoading(false);

		return () => {
			isMounted = false; // cleanup para evitar memory leaks
		};
	}, [competitorDraft, categories]);

	const enroll = async () => {
		try {
			const payload = {
				competitor_uuid: competitorDraft.uuid,
				categories: competitorCategoriesDraft,
			};
			const res = await enrollCompetitor(tournament.code, payload);

			const competitorDraftResponse = competitorSchema.parse(res);

			setCompetitorDraft(competitorDraftResponse);

			// Clear de las categorias seleccionadas
			setCompetitorCategoriesDraft([]);
			successToast(`Competidor inscripto exitosamente.`);
		} catch (error) {
			console.error(error);
			errorToast(
				"Ha ocurrido un error al inscribir el competidor a las categorías seleccionadas. Por favor intenta nuevamente."
			);
		}
	};

	return (
		// <div className="bg-elevated flex flex-col gap-2 shadow-lg justify-center p-3 rounded-lg">
		<div className="col-span-3 col-start-1 row-start-2 bg-elevated flex flex-col gap-2 shadow-lg justify-center p-3 rounded-lg">
			<div className="flex flex-col gap-3">
				<h1 className="font-extrabold flex items-center gap-1 text-2xl">
					<BiCategoryAlt /> Categorías
				</h1>
			</div>
			<div className="flex flex-col gap-0.5">
				{loading ? (
					<span>Cargando categorias</span>
				) : (
					// Already Enrolled
					[...enrolledCategories, ...enrollableCategories].map(
						(categoryWithStatus: CategoryWithStatus, i) =>
							categoryWithStatus.status ===
							CategoryStatus.AVAILABLE ? (
								<EnrollableCategory
									key={`${i}-enrollable`}
									category={categoryWithStatus.category}
								/>
							) : (
								<EnrolledCategory
									key={`${i}-enrolled`}
									category={categoryWithStatus.category}
								/>
							)
					)
				)}
				{mode === ManageCompetitorModes.EDIT && (
					<div className="w-full flex justify-end">
						<Button
							disabled={!competitorDraft.id}
							onClick={() => {
								enroll();
							}}
						>
							Enroll
						</Button>
					</div>
				)}
			</div>
		</div>
	);
};

export default AvailableCategories;
