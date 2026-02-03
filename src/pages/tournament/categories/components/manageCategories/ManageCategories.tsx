import { ManageModes } from "@/types/enums";
import CategoriesList from "./CategoriesList";
import CategoryForm from "./CategoryForm";
import CategoryInfo from "./CategoryInfo";
import { useManageCategories } from "./ManageCategoryContext";
import { useMemo } from "react";

interface ManageCategoryProps {

}

const ManageCategories = ({} : ManageCategoryProps) => {
    const {selectedCategory, manageMode} = useManageCategories();
    const isCreate = manageMode === ManageModes.CREATE;
    const isSelCategoryAndViewOrEdit = (!!selectedCategory && [ManageModes.VIEW, ManageModes.EDIT].includes(manageMode))
    console.log("manageMode: ", manageMode)
    console.log("isCreate: ", isCreate, "isSelectedCategoryAndViewOrEdit: ", isSelCategoryAndViewOrEdit)
    const areTwoPanesActive = useMemo(()=> manageMode === ManageModes.CREATE || (!!selectedCategory && [ManageModes.VIEW, ManageModes.EDIT].includes(manageMode)), [manageMode, selectedCategory])
    console.log(manageMode === ManageModes.CREATE || (!!selectedCategory && [ManageModes.VIEW, ManageModes.EDIT].includes(manageMode)))
    return (
        <div className={`grid grid-cols-5 gap-2 items-start`}>
            <div className={`flex flex-col ${areTwoPanesActive ? "col-span-3" : "col-span-5"} gap-3 bg-elevated p-3 rounded-lg shadow-md`}>
                <CategoriesList />
            </div>
            <div className={`flex flex-col ${areTwoPanesActive ? "col-span-2" : "col-span-0"} gap-3 bg-elevated p-3 rounded-lg shadow-md`}>
                { selectedCategory && manageMode === ManageModes.VIEW 
                && <CategoryInfo /> }
                { selectedCategory && manageMode === ManageModes.EDIT 
                && <CategoryForm /> }
                { manageMode === ManageModes.CREATE
                && <CategoryForm /> }
            </div>
        </div>
    );
}

export default ManageCategories;