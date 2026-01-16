import CategoriesList from "./CategoriesList";
import CategoryInfo from "./CategoryInfo";
import { useManageCategories } from "./ManageCategoryContext";

interface ManageCategoryProps {
    // category: CategorySchema;
}

const ManageCategories = ({} : ManageCategoryProps) => {
    const {selectedCategory} = useManageCategories();
    return (
        <div className={`grid grid-cols-5 shadow-lg rounded-lg gap-2 items-start`}>
            <CategoriesList />
            { selectedCategory && <CategoryInfo /> }
        </div>
    );
}

export default ManageCategories;