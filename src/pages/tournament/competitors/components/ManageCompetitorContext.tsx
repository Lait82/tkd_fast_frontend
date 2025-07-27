// CompetitorContext.tsx
import { errorToast } from "@/services/toasts";
import { getAvailableCategories, getTeams } from "@/services/tournamentService";
import { getUserCompetitors } from "@/services/userService";
import { useTournamentStore } from "@/states/useTournamentStore";
import {
    ManageCompetitorModes,
    ManageCompetitorTypes,
    Rank,
} from "@/types/enums";
import {
    CategorySchema,
    categorySchema,
    competitorSchema,
    CompetitorSchema,
    teamSchema,
    TeamSchema,
} from "@/types/schemas/primitiveSchemas";
import dayjs, { Dayjs } from "dayjs";
import React, {
    createContext,
    Dispatch,
    SetStateAction,
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

interface ManageCompetitorsContextType {
    competitorDraft: CompetitorSchema;
    setCompetitorDraft: (c: CompetitorSchema) => void;

    userCompetitors: CompetitorSchema[];
    setUserCompetitors: React.Dispatch<
        React.SetStateAction<CompetitorSchema[]>
    >;

    mode: ManageCompetitorModes;
    setMode: (m: ManageCompetitorModes) => void;
    manageType: ManageCompetitorTypes;
    setManageType: (m: ManageCompetitorTypes) => void;
    categories: CategorySchema[];
    setSelectedCategories: Dispatch<SetStateAction<string[]>>;
    selectedCategories: string[];
    selectedMembers: string[];
    setSelectedMembers: Dispatch<SetStateAction<string[]>>;
    newCompetitorSchema: z.ZodObject;
    teamDraft: z.ZodObject;
    setTeamDraft: (t: TeamSchema) => void;
    teams: TeamSchema[];
    setTeams: (t: TeamSchema[]) => void;
}

const ManageCompetitorsContext = createContext<
    ManageCompetitorsContextType | undefined
>(undefined);

export const ManageCompetitorsProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [mode, setMode] = useState<ManageCompetitorModes>(
        ManageCompetitorModes.CREATE
    );

    const [manageType, setManageType] = useState<ManageCompetitorTypes>(
        ManageCompetitorTypes.TEAM
    );

    const [userCompetitors, setUserCompetitors] = useState<CompetitorSchema[]>(
        []
    );
    const [categories, setCategories] = useState<CategorySchema[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
    const [competitorDraft, setCompetitorDraft] = useState<CompetitorSchema>(
        competitorSchema.parse({})
    );
    const [teamDraft, setTeamDraft] = useState<TeamSchema>(
        teamSchema.parse({})
    );
    const [teams, setTeams] = useState<TeamSchema[]>([]);

    const { tournament } = useTournamentStore();

    // Load user's competitors.
    useEffect(() => {
        let isMounted = true;
        const fetchCompetitors = async () => {
            try {
                const res = await getUserCompetitors(tournament.code);
                const competitors = competitorSchema.array().parse(res);
                if (isMounted) setUserCompetitors(competitors);
            } catch (error) {
                console.error("Error al obtener torneos:", error);
                errorToast(
                    "Ha ocurrido un error al obtener los torneos, por favor recarga la página."
                );
            } finally {
                // if (isMounted) setLoading(false);
            }
        };

        fetchCompetitors();

        const fetchTeams = async () => {
            try {
                const res = await getTeams(tournament.code);
                const teams = teamSchema.array().parse(res);
                if (isMounted) setTeams(teams);
            } catch (error) {
                console.error("Error al obtener equipos:", error);
                errorToast(
                    "Ha ocurrido un error al obtener tus equipos, por favor recarga la página."
                );
            } finally {
                // if (isMounted) setLoading(false);
            }
        };

        fetchTeams();

        return () => {
            isMounted = false; // cleanup para evitar memory leaks
        };
    }, []);

    // Load Available categories state.
    useEffect(() => {
        let isMounted = true;
        const fetchCategories = async () => {
            try {
                // API fetch
                const res = await getAvailableCategories(tournament.code);
                const availableCategories = categorySchema.array().parse(res);
                if (isMounted) setCategories(availableCategories);
                // setLoading(false);
            } catch (error) {
                errorToast(
                    "Ha ocurrido un error al obtener las categorías disponibles, por favor recarga la página."
                );
            }
            //  finally {
            // 	if (isMounted) setLoading(false);
            // }
        };

        fetchCategories();

        return () => {
            isMounted = false; // cleanup para evitar memory leaks
        };
    }, [competitorDraft]);

    return (
        <ManageCompetitorsContext.Provider
            value={{
                competitorDraft,
                setCompetitorDraft,
                mode,
                setMode,
                userCompetitors,
                setUserCompetitors,
                categories,
                setSelectedCategories,
                selectedCategories,
                newCompetitorSchema,
                manageType,
                setManageType,
                teamDraft,
                setTeamDraft,
                selectedMembers,
                setSelectedMembers,
                setTeams,
                teams,
            }}
        >
            {children}
        </ManageCompetitorsContext.Provider>
    );
};

export const useManageCompetitors = () => {
    const context = useContext(ManageCompetitorsContext);
    if (!context)
        throw new Error(
            "useCompetitor must be used within a ManageCompetitorsProvider"
        );
    return context;
};
