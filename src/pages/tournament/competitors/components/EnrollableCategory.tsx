import { CategorySchema } from "@/types/schemas/primitiveSchemas";
import { useManageCompetitors } from "./ManageCompetitorContext";
import { Checkbox, Field, Label } from "@headlessui/react";
import IconsCategoryName from "@/components/IconsCategoryName";
import { ManageCompetitorModes } from "@/types/enums";

const EnrollableCategory = ({ category }: { category: CategorySchema }) => {
	const {
		newCompetitor,
		setNewCompetitor,
		mode,
		setCompetitorCategoriesDraft,
		competitorCategoriesDraft,
	} = useManageCompetitors();

	const handleToggle = (categoryUuid: string) => {
		// newCompetitor.categories = uuid[];

		// competitorDraft.inscriptions = {uuid:'', ...}[]

		if (mode === ManageCompetitorModes.CREATE) {
			const currentCategories = newCompetitor.categories || [];
			const updated = currentCategories.includes(categoryUuid)
				? currentCategories.filter((uuid) => uuid !== categoryUuid)
				: [...currentCategories, categoryUuid];

			setNewCompetitor({
				...newCompetitor,
				categories: updated,
			});
		} else if (mode === ManageCompetitorModes.EDIT) {
			console.log("competitorCategoriesDraft");
			console.log(competitorCategoriesDraft);
			const currentCategories: string[] = Array.from(
				competitorCategoriesDraft
			);

			const updated = currentCategories.includes(categoryUuid) // Si la category ya esta incluida
				? currentCategories.filter((uuid) => uuid !== categoryUuid) // la filtro
				: [...currentCategories, categoryUuid]; // sino la agrego.

			console.log("updated");
			console.log(updated);

			setCompetitorCategoriesDraft(updated);
		}
	};
	return (
		<Field>
			<Label
				className={`flex w-full px-1 py-1.5 font-bold justify-between cursor-pointer transition-all ease-fluid border 
                                    border-transparent rounded-lg hover:border-orange`}
			>
				<IconsCategoryName category={category} />
				<Checkbox
					checked={
						mode === ManageCompetitorModes.CREATE
							? newCompetitor.categories?.includes(category.uuid)
							: competitorCategoriesDraft.includes(category.uuid)
					}
					name={`category-${category.id}`}
					onChange={() => handleToggle(category.uuid)}
					className="group block size-2 rounded border bg-transparent border-neutrallight data-checked:border-orange
                                focus:outline-none focus:ring-0"
				>
					<svg
						className="stroke-orange opacity-0 group-data-checked:opacity-100"
						viewBox="0 0 14 14"
						fill="none"
					>
						<path
							d="M3 8L6 11L11 3.5"
							strokeWidth={2}
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</Checkbox>
			</Label>
		</Field>
	);
};

export default EnrollableCategory;
