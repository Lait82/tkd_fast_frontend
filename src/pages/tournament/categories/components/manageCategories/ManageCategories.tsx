import CategoriesList from "./CategoriesList";
import CategoryForm from "./CategoryForm";
import { useManageCategories } from "./ManageCategoryContext";

interface ManageCategoryProps {
    // category: CategorySchema;
}

const ManageCategories = ({} : ManageCategoryProps) => {
    const {selectedCategory} = useManageCategories();
    return (
        <div className={`grid grid-cols-5 gap-2 items-start`}>
            <CategoriesList />
            { selectedCategory && <CategoryForm /> }
        </div>
    );
}

export default ManageCategories;