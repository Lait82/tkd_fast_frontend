import { Trash2, UserPlus, Users } from "lucide-react";
import { InviteeSchemaT } from "../schemas";
import Tooltip from "@/components/Tooltip";
import { useManageInvites } from "../InvitesContext";
import { createInstructorSlot, deleteInvitee } from "@/services/tournament/invitationService";
import { useTournamentStore } from "@/states/useTournamentStore";
import { useState } from "react";
import DeleteInstructorModal from "./DeleteInstructorModal";
import { Kind } from "../types";

interface InstructorListProps {
    instructors: InviteeSchemaT[]
}

const InvitedInstructorsList = ({instructors}:InstructorListProps) => {
    // const {} = useManageInvites()
    const {tournament} = useTournamentStore();
    const {launchUpdateInvitees, setSelectedInvitee, selectedInvitee} = useManageInvites()

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [instructorToDelete, setInstructorToDelete] = useState<InviteeSchemaT>();

    const closeModal = () => {
        if (isOpen) setIsOpen(false);
    }
    return(									
    <div className="flex flex-col text-neutrallight transition-all rounded-lg gap-0.5">
        {instructorToDelete && <DeleteInstructorModal isOpen={isOpen} closeModal={closeModal} instructor={instructorToDelete} />}
        {instructors.map((instructor) => {
            const isSelected = selectedInvitee?.uuid === instructor.uuid;

            return (
                instructor.kind === Kind.VACANT
                ? <div className={`w-full flex justify-between gap-1 text-left px-1.5 py-1 transition-colors`} key={instructor.uuid}>
                    <span className="md:col-span-4 text-muted italic">
                        {"Lugar vacante"}
                    </span>
                    <Tooltip text="Eliminar vacante">
                        <div
                             onClick={()=>{
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
                    onClick={() => setSelectedInvitee(instructor)}
                    className={`w-full grid grid-cols-[1fr_1fr_1fr_auto] rounded-lg items-center gap-1 text-left px-1.5 transition-colors border border-transparent hover:cursor-pointer hover:border-orange hover:has-[.child:hover]:border-transparent
                        ${isSelected ? "border-orange!": ""}
                        rounded`}
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
                                e.stopPropagation()
                                setInstructorToDelete(instructor)
                                setIsOpen(true)
                                console.log("test")
                            }}
                            className="group child flex transition-all hover:cursor-pointer p-1 rounded-full hover:bg-red-700/10">
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