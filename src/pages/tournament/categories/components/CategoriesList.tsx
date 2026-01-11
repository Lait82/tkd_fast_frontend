import { useManageCategories } from "./ManageCategoryContext";
import CategoryRow from "./categoriesList/CategoryRow";

const CategoriesList = ({}) => {
    const { categories } = useManageCategories();
    return (
        <div className="bg-elevated flex flex-col gap-2 shadow-lg justify-center p-3 rounded-lg">
			<div className="flex flex-col gap-3">
				<h1 className="font-extrabold text-2xl">
					Categorias
				</h1>
				<div className="flex flex-col rounded-lg overflow-hidden">
                    {categories.map((category, i) => (
                        <CategoryRow category={category} key={`single-category-${i}`} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CategoriesList;