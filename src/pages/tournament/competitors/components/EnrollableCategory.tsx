import { CategorySchema } from "@/types/schemas/primitiveSchemas";
import { useManageCompetitors } from "./ManageCompetitorContext";
import { Checkbox, Field, Label } from "@headlessui/react";
import IconsCategoryName from "@/components/IconsCategoryName";
import { ManageCompetitorModes } from "@/types/enums";

const EnrollableCategory = ({ category }: { category: CategorySchema }) => {
	const { mode, setSelectedCategories, selectedCategories } =
		useManageCompetitors();

	const handleToggle = (categoryUuid: string) => {
		if (mode === ManageCompetitorModes.CREATE) {
			const currentCategories: string[] = Array.from(selectedCategories);
			const updated = currentCategories.includes(categoryUuid)
				? currentCategories.filter((uuid) => uuid !== categoryUuid)
				: [...currentCategories, categoryUuid];

			setSelectedCategories(updated);
		} else if (mode === ManageCompetitorModes.EDIT) {
			const currentCategories: string[] = Array.from(selectedCategories);

			const updated = currentCategories.includes(categoryUuid) // Si la category ya esta incluida
				? currentCategories.filter((uuid) => uuid !== categoryUuid) // la filtro
				: [...currentCategories, categoryUuid]; // sino la agrego.

			setSelectedCategories(updated);
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
					checked={selectedCategories.includes(category.uuid)}
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
