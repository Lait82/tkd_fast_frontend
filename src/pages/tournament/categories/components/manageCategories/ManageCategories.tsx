import CategoriesList from "./CategoriesList";
import CategoryInfo from "./CategoryInfo";
import { useManageCategories } from "./ManageCategoryContext";

interface ManageCategoryProps {
    // category: CategorySchema;
}

const ManageCategories = ({} : ManageCategoryProps) => {
    const {selectedCategory} = useManageCategories();
    return ( // ORDENAR LA INTERFAZ PARA CUANDO APARECE LA TAB DE INFO DE LA CATEGORIA.
        <div className={`grid ${selectedCategory 
            ? "grid-cols-[70%_30%]"
            : "grid-cols-1"
        } bg-elevated shadow-lg rounded-lg overflow-hidden gap-2 items-start
         p-3`}>
            <h1 className="font-extrabold text-2xl">
                Categorias
            </h1>
            {selectedCategory 
            && <h1 className="font-extrabold text-2xl">
                Informacion de la categoria
            </h1>}
            <CategoriesList />
            { selectedCategory && <CategoryInfo /> }
        </div>
    );
}

export default ManageCategories;