import { getInvitees } from "@/services/tournament/invitationService";
import { useTournamentStore } from "@/states/useTournamentStore";
import { Role } from "@/types/enums";
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
    useMemo,
    useState,
} from "react";
import { inviteeSchema, InviteeSchemaT } from "./schemas";
import { errorToast } from "@/services/toasts";


interface ManageInvitesContextType {
    launchUpdateInvitees: ()=> void;
    invitedInstructors: InviteeSchemaT[] | [];
    invitedMasters: InviteeSchemaT[] | [];
    invitees: InviteeSchemaT[] | [];
}

const ManageInvitesContext = createContext<
    ManageInvitesContextType | undefined
>(undefined);

export const ManageInvitesProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const { tournament } = useTournamentStore()
    // const [categories, setCategories] = useState<CategorySchema[]>([]);
    // const [newCategory, setNewCategory] = useState<NewCategorySchema|null>(null);
    const [invitees, setInvitees] = useState<InviteeSchemaT[]>([])
    const invitedInstructors = useMemo(() => invitees.filter(invitee => invitee.role === Role.INSTRUCTOR), [invitees]);
    const invitedMasters = useMemo(() => invitees?.filter(invitee => invitee.role === Role.MASTER), [invitees]);

    const _fetchInvitees = async (inviteeRole?: Role) => {
        try {
            // API fetch
            const res = await getInvitees(tournament.code, inviteeRole);
            const inviteesRes = inviteeSchema.array().parse(res);
            setInvitees(inviteesRes);
        } catch (error) {
            console.log(error.issues)
            errorToast(
                "Ha ocurrido un error al obtener los invitados, por favor recarga la página."
            );
        }
    };
    useEffect(()=>{
        let isMounted = true;
        if(isMounted){
            _fetchInvitees();
        }
        return () => {
            isMounted = false;
        };
    }, [tournament.code]);

    const launchUpdateInvitees = () => 
    {
        _fetchInvitees()
    }

    return (
        <ManageInvitesContext.Provider
            value={{
                // draftCategory: categorySchema.parse({}),
                // setNewCategory: setNewCategory,
                // newCategory: newCategory,
                // categories: categories,
                launchUpdateInvitees: launchUpdateInvitees,
                invitedInstructors: invitedInstructors,
                invitedMasters: invitedMasters,
                invitees: invitees

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
