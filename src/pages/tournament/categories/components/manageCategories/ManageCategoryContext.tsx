// CompetitorContext.tsx
import { getAllCategories } from "@/services/categoryService";
import { errorToast } from "@/services/toasts";
import { useTournamentStore } from "@/states/useTournamentStore";
import { ManageModes } from "@/types/enums";
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
import { CategoryModalTypes } from "../../types";


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
    categoryToDelete: CategorySchema | null;
    setCategoryToDelete: React.Dispatch<
        React.SetStateAction<CategorySchema | null>
    >;
    manageMode: ManageModes;
    setManageMode: React.Dispatch<React.SetStateAction<ManageModes>>;
    launchCategoryUpdate: () => void;
    isDeleteModalOpen: boolean;
    isEditModalOpen: boolean;
    openModal: (modalType: CategoryModalTypes) => void;
    closeModal: (modalType: CategoryModalTypes) => void;
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
    const [categoryToDelete, setCategoryToDelete] = useState<CategorySchema | null>(null);
    const [newCategory, setNewCategory] = useState<NewCategorySchema|null>(null);
    const [manageMode, setManageMode] = useState<ManageModes>(ManageModes.EDIT);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)
    
    const openModal = (modalType: CategoryModalTypes) => {
        if(modalType === CategoryModalTypes.DELETE) setIsDeleteModalOpen(true)
        if(modalType === CategoryModalTypes.EDIT) setIsEditModalOpen(true)
    }
    const closeModal = (modalType: CategoryModalTypes) => {
        if(modalType === CategoryModalTypes.DELETE) setIsDeleteModalOpen(false)
        if(modalType === CategoryModalTypes.EDIT) setIsEditModalOpen(false)
    } 

    const _fetchCategories = async () => {
        try {
            const res = await getAllCategories(tournament.code);
            const allCategories = categorySchema.array().parse(res);
            setCategories(allCategories);
            if (selectedCategory) {
                const updatedSelected = allCategories.find(cat => cat.uuid === selectedCategory.uuid) ?? null;
                setSelectedCategory(updatedSelected);
            }
        } catch (error) {
            console.error("Error al obtener torneos:", error);
            errorToast(
                "Ha ocurrido un error al obtener las categorías, por favor recarga la página."
            );
        } finally {
            setLoadingCategories(false);
        }
    };

    
    // Get categories on mount
    useEffect(()=>{
        let isMounted = true;
        if(isMounted){
            _fetchCategories();
        }
        return () => {
            isMounted = false;
        };
    }, [tournament.code]);

    const launchCategoryUpdate = () => {
        _fetchCategories()
    }

    return (
        <ManageCategoriesContext.Provider
            value={{
                draftCategory: categorySchema.parse({}),
                setNewCategory: setNewCategory,
                newCategory: newCategory,
                categories: categories,
                loadingCategories: loadingCategories,
                selectedCategory: selectedCategory,
                setSelectedCategory:setSelectedCategory,
                manageMode: manageMode,
                setManageMode: setManageMode,
                launchCategoryUpdate: launchCategoryUpdate,
                isDeleteModalOpen:isDeleteModalOpen,
                isEditModalOpen: isEditModalOpen,
                openModal: openModal,
                closeModal: closeModal,
                categoryToDelete: categoryToDelete,
                setCategoryToDelete: setCategoryToDelete
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
