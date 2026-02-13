import {
    CategorySchema,
    categorySchema,
    NewCategorySchema,
} from "@/types/schemas/primitiveSchemas";
import React, {
    createContext,
    ReactNode,
    useContext,
    useState,
} from "react";


interface ManageInvitesContextType {
    draftCategory: CategorySchema;
    setNewCategory: React.Dispatch<React.SetStateAction<NewCategorySchema|null>>;
    newCategory: NewCategorySchema|null;
    categories: CategorySchema[];
}

const ManageInvitesContext = createContext<
    ManageInvitesContextType | undefined
>(undefined);

export const ManageInvitesProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const [categories, setCategories] = useState<CategorySchema[]>([]);
    const [newCategory, setNewCategory] = useState<NewCategorySchema|null>(null);

    return (
        <ManageInvitesContext.Provider
            value={{
                draftCategory: categorySchema.parse({}),
                setNewCategory: setNewCategory,
                newCategory: newCategory,
                categories: categories,
            }}
        >
            {children}
        </ManageInvitesContext.Provider>
    );
};

export const useManageInvites = () => {
    const context = useContext(ManageInvitesContext);
    if (!context)
        throw new Error(
            "useManageInvites must be used within a ManageInvitesProvider"
        );
    return context;
};
