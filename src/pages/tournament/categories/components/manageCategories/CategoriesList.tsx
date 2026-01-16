import { useManageCategories } from "./ManageCategoryContext";
import CategoryRow from "./categoriesList/CategoryRow";

const CategoriesList = ({}) => {
    const { categories, selectedCategory } = useManageCategories();
    return (
        <div className={`flex flex-col ${selectedCategory ? "col-span-3" : "col-span-5"} gap-3 bg-elevated p-3 rounded-lg shadow-md`}>
            <h1 className="font-extrabold text-2xl">Lista de Categorias</h1>
            <div className="flex flex-col gap-2">
                {categories.map((category, i) => (
                    <CategoryRow category={category} key={`single-category-${i}`} />
                ))}
            </div>
        </div>
    );
}

export default CategoriesList;