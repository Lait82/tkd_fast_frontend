// CompetitorContext.tsx
import { getAllCategories } from "@/services/categoryService";
import { errorToast } from "@/services/toasts";
import { useTournamentStore } from "@/states/useTournamentStore";
import {
    Rank,
} from "@/types/enums";
import {
    CategorySchema,
    categorySchema,
} from "@/types/schemas/primitiveSchemas";
import dayjs, { Dayjs } from "dayjs";
import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import { z } from "zod/v4";

const newCompetitorSchema = z.object({
    email: z.email("Por favor, ingresa un email válido."),
    id_number: z.string(),
    firstname: z.string().min(2, "El nombre es demasiado corto."),
    lastname: z.string().min(2, "El apellido es demasiado corto."),
    dob: z.preprocess(
        (val: string) => dayjs(val, "DD-MM-YYYY"),
        z
            .custom<Dayjs>((val) => dayjs.isDayjs(val))
            .refine((val) => val.isBefore(dayjs().subtract(3, "years")), {
                message: "El competidor no puede ser menor a 3 años.",
            })
    ),

    rank: z.enum(Rank).default(Rank.WHITE),
});

// type MemberSlot = {
//     id: string;
//     uuid: string;
// };
interface ManageCategoriesContextType {
    // Cosas que puedo usar en el contexto y sus tipos como por ej:
    // competitorDraft: CompetitorSchema;
    // setCompetitorDraft: (c: CompetitorSchema) => void;

    // userCompetitors: CompetitorSchema[];
    // setUserCompetitors: React.Dispatch<
    //     React.SetStateAction<CompetitorSchema[]>
    // >;
    draftCategory: CategorySchema;
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

    // Get categories on mount
    useEffect(()=>{
        let isMounted = true;
        const fetchCategories = async () => {
            try {
                const res = await getAllCategories(tournament.code);
                const allCategories = categorySchema.array().parse(res);
                if (isMounted) setCategories(allCategories);
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
