import { useManageCategories } from "./ManageCategoryContext";
import CategoryRow from "./categoriesList/CategoryRow";

const CategoriesList = ({}) => {
    const { categories } = useManageCategories();
    return (
        <div className="flex flex-col rounded-lg gap-0.5">
            {categories.map((category, i) => (
                <CategoryRow category={category} key={`single-category-${i}`} />
            ))}
        </div>
    );
}

export default CategoriesList;