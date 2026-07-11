import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { useManageInvites } from "../InvitesContext"
import { CiClock2 } from "react-icons/ci";
import { Role } from "@/types/enums";
import { FilledInstructorSchemaT, InvitedMasterT } from "../schemas";
import { InvitationStatus } from "../types";

const statusIcon = (status: InvitationStatus) => {
    if (status === InvitationStatus.ACCEPTED) {
        return <IoCheckmarkCircleOutline className="text-green" size={18} />;
    }

    return <CiClock2 className="text-yellow" size={18} />;
};

const STATUS_TEXT: Record<InvitationStatus, string> = {
    [InvitationStatus.PENDING]: "Pendiente",
    [InvitationStatus.ACCEPTED]: "Aceptado",
    [InvitationStatus.EXPIRED]: "Expirada"
};
const MasterInfo = ({master}:{master:InvitedMasterT}) => {
    return(
        <div className="bg-elevated rounded-lg p-3 shadow-lg flex flex-col gap-1.5">
            <h3 className="text-2xl font-extrabold">Información de maestro</h3>
            <div className="grid grid-cols-2 gap-y-1 text-sm">
                <span className="text-muted">Nombre:</span>
                <span>{master.firstname} {master.lastname}</span>

                <span className="text-muted">Email:</span>
                <span className="italic">{master.email}</span>

                <span className="text-muted">Status:</span>
                <span className="inline-flex items-center gap-0.5">
                    {statusIcon(master.status)}
                    {STATUS_TEXT[master.status]}
                </span>
                <span className="text-muted">masteres Invitados:</span>
                <span>{master.instructorsInvited}</span>

                <span className="text-muted">Competidores:</span>
                <span>{master.enrolledCompetitors}</span>
            </div>
        </div>
    )
}

const InstructorInfo = ({instructor}:{instructor:FilledInstructorSchemaT}) => {
    return (
        <div className="bg-elevated rounded-lg p-3 shadow-lg flex flex-col gap-1.5">
            <h3 className="text-2xl font-extrabold">Información del instructor</h3>
            <div className="grid grid-cols-2 gap-y-1 text-sm">
                <span className="text-muted">Nombre:</span>
                <span>{instructor.firstname} {instructor.lastname}</span>

                <span className="text-muted">Email:</span>
                <span className="italic">{instructor.email}</span>

                <span className="text-muted">Competidores:</span>
                <span>{instructor.enrolledCompetitors}</span>
            </div>
        </div>
    )
}

const InviteeInfo = () => {
    const {selectedInvitee} = useManageInvites();
    if(!selectedInvitee){
        return (
                <div className="bg-elevated rounded-lg p-3 shadow-lg flex flex-col gap-1.5">
            <h3 className="text-2xl font-extrabold">Información del invitado</h3>
            <p className="text-muted">Seleccioná un maestro o instructor para ver su información.</p>
            </div>
        );
    }
    return(
        selectedInvitee?.role === Role.INSTRUCTOR
        ? <InstructorInfo instructor={selectedInvitee} />
        : <MasterInfo master={selectedInvitee} />
    )
}

export default InviteeInfo