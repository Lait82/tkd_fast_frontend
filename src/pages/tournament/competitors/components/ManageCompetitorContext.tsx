// CompetitorContext.tsx
import { getAvailableCategories } from "@/services/categoryService";
import { errorToast } from "@/services/toasts";
import { getTeams } from "@/services/tournament/tournamentService";
import { getUserCompetitors } from "@/services/userService";
import { useTournamentStore } from "@/states/useTournamentStore";
import {
    ManageModes,
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
import { getRankOrderNumber } from "@/utils/utils";
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

type MemberSlot = {
    id: string;
    uuid: string;
};
interface ManageCompetitorsContextType {
    competitorDraft: CompetitorSchema;
    setCompetitorDraft: (c: CompetitorSchema) => void;

    userCompetitors: CompetitorSchema[];
    setUserCompetitors: React.Dispatch<
        React.SetStateAction<CompetitorSchema[]>
    >;

    mode: ManageModes;
    setMode: (m: ManageModes) => void;
    manageType: ManageCompetitorTypes;
    setManageType: (m: ManageCompetitorTypes) => void;
    categories: CategorySchema[];
    setSelectedCategories: Dispatch<SetStateAction<string[]>>;
    selectedCategories: string[];
    selectedMembers: MemberSlot[];
    setSelectedMembers: Dispatch<SetStateAction<MemberSlot[]>>;
    newCompetitorSchema: z.ZodObject;
    teamDraft: TeamSchema;
    setTeamDraft: (t: TeamSchema) => void;
    teams: TeamSchema[];
    setTeams: (t: TeamSchema[]) => void;
    updateTeams: (updatedTeams: TeamSchema[] | TeamSchema) => void;
    updateCompetitors: (
        updatedCompetitors: CompetitorSchema[] | CompetitorSchema
    ) => void;
}

const ManageCompetitorsContext = createContext<
    ManageCompetitorsContextType | undefined
>(undefined);

export const ManageCompetitorsProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [mode, setMode] = useState<ManageModes>(
        ManageModes.CREATE
    );

    const [manageType, setManageType] = useState<ManageCompetitorTypes>(
        ManageCompetitorTypes.TEAM
    );

    const [userCompetitors, setUserCompetitors] = useState<CompetitorSchema[]>(
        []
    );
    const [categories, setCategories] = useState<CategorySchema[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedMembers, setSelectedMembers] = useState<MemberSlot[]>([]);
    const [competitorDraft, setCompetitorDraft] = useState<CompetitorSchema>(
        competitorSchema.parse({})
    );
    const [teamDraft, setTeamDraft] = useState<TeamSchema>(
        teamSchema.parse({})
    );
    const [teams, setTeams] = useState<TeamSchema[]>([]);

    const { tournament } = useTournamentStore();

    const updateTeams = (updatedTeams: TeamSchema[] | TeamSchema) => {
        const updatedTeamsArr: TeamSchema[] = Array.isArray(updatedTeams)
            ? updatedTeams
            : [updatedTeams];

        // Update de state.
        setTeams((prev) => {
            const teamsMap = new Map(prev.map((t) => [t.uuid, t]));
            for (const updatedTeam of updatedTeamsArr) {
                teamsMap.set(updatedTeam.uuid, updatedTeam);
            }

            const updatedTeamsPayload = teamSchema
                .array()
                .parse(Array.from(teamsMap.values()));

            return updatedTeamsPayload;
        });

        // Update de teamDraft si es que fue updateado.
        const updatedMap = new Map(updatedTeamsArr.map((t) => [t.uuid, t]));
        const updatedDraft = updatedMap.get(teamDraft.uuid);
        if (updatedDraft) setTeamDraft(updatedDraft);
    };

    const updateCompetitors = (
        updatedCompetitors: CompetitorSchema[] | CompetitorSchema
    ) => {
        const updatedCompetitorsArr: CompetitorSchema[] = Array.isArray(
            updatedCompetitors
        )
            ? updatedCompetitors
            : [updatedCompetitors];

        // Update del state
        setUserCompetitors((prev) => {
            const userCompetitorsMap = new Map(prev.map((uc) => [uc.uuid, uc]));
            for (const u of updatedCompetitorsArr) {
                userCompetitorsMap.set(u.uuid, u);
            }

            const updatedCompetitorsPayload = competitorSchema
                .array()
                .parse(
                    Array.from(userCompetitorsMap.values()).sort(
                        (a, b) =>
                            getRankOrderNumber(b.user.rank) -
                            getRankOrderNumber(a.user.rank)
                    )
                );

            return updatedCompetitorsPayload;
        });

        // Update del draft si fue actualizado
        const updatedMap = new Map(
            updatedCompetitorsArr.map((t) => [t.uuid, t])
        );
        const updatedDraft = updatedMap.get(competitorDraft.uuid);
        if (updatedDraft) setCompetitorDraft(updatedDraft);
    };

    // Load user's competitors.
    useEffect(() => {
        let isMounted = true;
        const fetchCompetitors = async () => {
            try {
                const res = await getUserCompetitors(tournament.code);
                const competitors = competitorSchema.array().parse(res);
                competitors.sort(
                    (a, b) =>
                        getRankOrderNumber(b.user.rank) -
                        getRankOrderNumber(a.user.rank)
                );
                if (isMounted) setUserCompetitors(competitors);
                // if (isMounted)
                //     setCompetitorDraft(
                //         competitors.filter(
                //             (c) => c.user.firstname.toLowerCase() === "iñaki"
                //         )[0]
                //     );
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

    // Sync drafts with updatedStates
    useEffect(() => {
        if (competitorDraft.id) {
            // default id == 0, any other ID means that the draft is set.
            const updatedDraft = userCompetitors.filter(
                (uc) => uc.uuid === competitorDraft.uuid
            )[0];

            setCompetitorDraft(competitorSchema.parse(updatedDraft));
        }
    }, [userCompetitors]);

    useEffect(() => {
        if (teamDraft.uuid) {
            const updatedDraft = teams.filter(
                (t) => t.uuid === teamDraft.uuid
            )[0];
            console.log("update teamDraft");

            console.log("team draft =>");
            console.log(teamDraft);

            console.log("teams =>");
            console.log(teams);

            console.log("updated draft => ");
            console.log(teamSchema.parse(updatedDraft));

            setTeamDraft(teamSchema.parse(updatedDraft));
        }
    }, [teams]);

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
                updateTeams,
                updateCompetitors,
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
