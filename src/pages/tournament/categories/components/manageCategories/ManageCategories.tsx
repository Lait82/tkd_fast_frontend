import { ManageModes } from "@/types/enums";
import CategoriesList from "./CategoriesList";
import CategoryInfo from "./CategoryInfo";
import { useManageCategories } from "./ManageCategoryContext";
import { useMemo } from "react";
import DeleteModal from "./DeleteModal";
import EditCategoryForm from "./EditCategoryForm";
import CreateCategoryForm from "./CreateCategoryForm";

interface ManageCategoryProps {

}

const ManageCategories = ({} : ManageCategoryProps) => {
    const {selectedCategory, manageMode} = useManageCategories();
    const areTwoPanesActive = useMemo(()=> manageMode === ManageModes.CREATE || (!!selectedCategory && [ManageModes.VIEW, ManageModes.EDIT].includes(manageMode)), [manageMode, selectedCategory])
    
    return (
        <div className={`grid grid-cols-5 gap-2 items-start`}>
            <DeleteModal />
            <div className={`flex flex-col ${areTwoPanesActive ? "col-span-3" : "col-span-5"} gap-3 bg-elevated p-3 rounded-lg shadow-md`}>
                <CategoriesList />
            </div>
            <div className={`flex flex-col ${areTwoPanesActive ? "col-span-2" : "col-span-0 hidden!"} gap-3 bg-elevated p-3 rounded-lg shadow-md`}>
                { selectedCategory && manageMode === ManageModes.VIEW 
                && <CategoryInfo /> }
                { selectedCategory && manageMode === ManageModes.EDIT 
                && <EditCategoryForm /> }
                { manageMode === ManageModes.CREATE
                && <CreateCategoryForm /> }
            </div>
        </div>
    );
}

export default ManageCategories;