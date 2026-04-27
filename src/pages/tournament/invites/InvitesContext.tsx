import { getInvitees } from "@/services/tournament/invitationService";
import { useTournamentStore } from "@/states/useTournamentStore";
import { Role } from "@/types/enums";
import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { inviteeSchema, InviteeSchemaT, InvitedMasterT, FilledInstructorSchemaT } from "./schemas";
import { errorToast } from "@/services/toasts";
import { Kind } from "./types";


interface ManageInvitesContextType {
    launchUpdateInvitees: ()=> void;
    invitedInstructors: InviteeSchemaT[];
    invitedMasters: InvitedMasterT[];
    invitees: InviteeSchemaT[];
    selectedInvitee?: InvitedMasterT | FilledInstructorSchemaT | undefined;
    setSelectedInvitee: React.Dispatch<React.SetStateAction<InvitedMasterT | FilledInstructorSchemaT | undefined>>;
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
    const [invitees, setInvitees] = useState<InviteeSchemaT[]>([])
    const invitedInstructors = useMemo(() => invitees.filter(invitee => invitee.role === Role.INSTRUCTOR), [invitees]);
    const invitedMasters = useMemo(() => invitees?.filter(invitee => invitee.role === Role.MASTER && invitee.kind === Kind.FILLED), [invitees]);
    const [selectedInvitee, setSelectedInvitee] = useState<InvitedMasterT | FilledInstructorSchemaT | undefined>();

    const _fetchInvitees = async (inviteeRole?: Role) => {
        try {
            // API fetch
            const res = await getInvitees(tournament.code, inviteeRole);
            const inviteesRes = inviteeSchema.array().parse(res);
            setInvitees(inviteesRes);
        } catch (error) {
            console.log(error)
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
                launchUpdateInvitees: launchUpdateInvitees,
                invitedInstructors: invitedInstructors,
                invitedMasters: invitedMasters,
                invitees: invitees,
                selectedInvitee: selectedInvitee,
                setSelectedInvitee: setSelectedInvitee

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
