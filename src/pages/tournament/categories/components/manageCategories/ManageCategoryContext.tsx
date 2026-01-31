// CompetitorContext.tsx
import { getAllCategories } from "@/services/categoryService";
import { errorToast } from "@/services/toasts";
import { useTournamentStore } from "@/states/useTournamentStore";
import {
    CategorySchema,
    categorySchema,
    NewCategorySchema,
} from "@/types/schemas/primitiveSchemas";
import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";


interface ManageCategoriesContextType {
    draftCategory: CategorySchema;
    setNewCategory: React.Dispatch<React.SetStateAction<NewCategorySchema|null>>;
    newCategory: NewCategorySchema|null;
    categories: CategorySchema[];
    loadingCategories: boolean;
    selectedCategory: CategorySchema | null;
    setSelectedCategory: React.Dispatch<
        React.SetStateAction<CategorySchema | null>
    >;
}

const ManageCategoriesContext = createContext<
    ManageCategoriesContextType | undefined
>(undefined);

export const ManageCategoriesProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const { tournament } = useTournamentStore();
    const [categories, setCategories] = useState<CategorySchema[]>([]);
    const [loadingCategories, setLoadingCategories] = useState<boolean>(false);
    const [selectedCategory, setSelectedCategory] = useState<CategorySchema | null>(null);
    const [newCategory, setNewCategory] = useState<NewCategorySchema|null>(null);
    // Get categories on mount
    useEffect(()=>{
        let isMounted = true;
        const fetchCategories = async () => {
            try {
                const res = await getAllCategories(tournament.code);
                const allCategories = categorySchema.array().parse(res);
                if (isMounted) setCategories(allCategories);
                setSelectedCategory(allCategories[0])
            } catch (error) {
                console.error("Error al obtener torneos:", error);
                errorToast(
                    "Ha ocurrido un error al obtener las categorías, por favor recarga la página."
                );
            } finally {
                if (isMounted) setLoadingCategories(false);
            }
        };

        fetchCategories();
        return () => {
            isMounted = false;
        };
    }, [tournament.code]);

    return (
        <ManageCategoriesContext.Provider
            value={{
                draftCategory: categorySchema.parse({}),
                setNewCategory: setNewCategory,
                newCategory: newCategory,
                categories: categories,
                loadingCategories: loadingCategories,
                selectedCategory: selectedCategory,
                setSelectedCategory:setSelectedCategory
            }}
        >
            {children}
        </ManageCategoriesContext.Provider>
    );
};

export const useManageCategories = () => {
    const context = useContext(ManageCategoriesContext);
    if (!context)
        throw new Error(
            "useManageCategories must be used within a ManageCategoriesProvider"
        );
    return context;
};
