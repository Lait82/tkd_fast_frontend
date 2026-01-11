import CategoriesList from "./CategoriesList";
import { ManageCategoriesProvider } from "./ManageCategoryContext";

interface ManageCategoryProps {
    // category: CategorySchema;
}

const ManageCategories = ({} : ManageCategoryProps) => {
    return (
        <ManageCategoriesProvider>
            <div className="bg-super-elevated rounded-lg shadow-md overflow-hidden gap-2">
                <CategoriesList />
                {/* <CategoryInfo /> */}
            </div>
        </ManageCategoriesProvider>
    );
}

export default ManageCategories;