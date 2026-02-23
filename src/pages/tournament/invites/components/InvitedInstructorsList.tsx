import { Trash2, UserPlus, Users } from "lucide-react";
import { InviteeSchemaT } from "../schemas";
import Tooltip from "@/components/Tooltip";
import { useManageInvites } from "../InvitesContext";
import { createInstructorSlot, deleteInvitee } from "@/services/tournament/invitationService";
import { useTournamentStore } from "@/states/useTournamentStore";
import { errorToast } from "@/services/toasts";

interface InstructorListProps {
    instructors: InviteeSchemaT[]
}

// TODO: REMOVE THIS AND IMPLEMENT THE REAL SELECT INVITEE
const setSelectedMasterId = (someuuid: any) => {
    console.log(someuuid);
} 

const InvitedInstructorsList = ({instructors}:InstructorListProps) => {
    // const {} = useManageInvites()
    const {tournament} = useTournamentStore();
    const {launchUpdateInvitees} = useManageInvites()
    
    return(									
    <div className="flex flex-col text-neutrallight transition-all rounded-lg gap-0.5">
        {instructors.map((instructor) => {
            // const isSelected = selectedMasterId === instructor.id;
            const isVacant = !instructor.email

            return (
                isVacant 
                ? <div className={`w-full flex justify-between gap-1 text-left px-1.5 py-1 transition-colors`}>
                    <span className="md:col-span-4 text-muted italic">
                        {"Lugar vacante"}
                    </span>
                    <Tooltip text="Eliminar vacante">
                        <div
                             onClick={(e)=>{
                                // e.stopPropagation()
                                // openModal(CategoryModalTypes.DELETE)
                                // setCategoryToDelete(category)
                                deleteInvitee(instructor.uuid)
                                launchUpdateInvitees();
                            }}
                            className="group flex transition-all hover:cursor-pointer p-1 rounded-full hover:bg-red-700/10">
                            <Trash2 className="transition-all ease-fluid fill-transparent stroke-red-700 hover:ease-fluid group-hover:fill-red-700 cursor-pointer" />
                        </div>
                    </Tooltip>
                </div>
                
                // #### USED VACANT SLOT #### 
                : (<div
                    // type="button"
                    key={instructor.uuid}
                    onClick={() => setSelectedMasterId(instructor.uuid)}
                    className={`w-full grid grid-cols-[1fr_1fr_1fr_auto] rounded-lg items-center gap-1 text-left px-1.5 py-1 transition-colors border border-transparent hover:cursor-pointer hover:border-orange ${
                        // isSelected ? "bg-elevated rounded" : "hover:bg-elevated/60"
                        "rounded"
                    }`}
                >
                    <span className="">
                        {instructor.firstname} {instructor.lastname}
                    </span>
                    <span className=" text-muted italic">
                        {instructor.email}
                    </span>
                    <div className="flex gap-0.5">
                        <Users />
                        <span className=" inline-flex items-center gap-0.5">
                            {instructor.enrolledCompetitors} Competidores
                            {/* {statusIcon(instructor.status)}
                            {STATUS_TEXT[instructor.status]} */}
                        </span>
                    </div>
                    <Tooltip text="Eliminar instructor">
                        <div
                             onClick={(e)=>{
                                // e.stopPropagation()
                                // openModal(CategoryModalTypes.DELETE)
                                // setCategoryToDelete(category)
                                console.log("test")
                            }}
                            className="group flex transition-all hover:cursor-pointer p-1 rounded-full hover:bg-red-700/10">
                            <Trash2 className="transition-all ease-fluid fill-transparent stroke-red-700 hover:ease-fluid group-hover:fill-red-700 cursor-pointer" />
                        </div>
                    </Tooltip>
                </div>)
            );
        })}
        <div 
            className="flex px-1.5 gap-1 border border-transparent hover:border-orange py-1 rounded-lg transition-all cursor-pointer"
            onClick={() => { 
                createInstructorSlot(tournament.code)
                launchUpdateInvitees()
             }}    
        >
            <UserPlus />
            <span className="italic text-muted">
                Agregar vacante
            </span>
        </div>
    </div>);
}
export default InvitedInstructorsList