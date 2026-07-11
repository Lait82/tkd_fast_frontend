import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { useManageInvites } from "../InvitesContext";
import { InvitedMasterT } from "../schemas";
import { CiClock2 } from "react-icons/ci";
import { InvitationStatus } from "../types";
import { FormEvent, useState } from "react";
import { errorToast, successToast } from "@/services/toasts";
import Button from "@/components/Button";
import { LuUserPlus } from "react-icons/lu";
// import Tooltip from "@/components/Tooltip";
// import { Trash2 } from "lucide-react";
import FormInput from "@/components/forms/FormInput";
import { z } from "zod";
import { useFormValidation } from "@/hooks/useFormValidation";
import { inviteMaster } from "../lib/services";
import { useTournamentStore } from "@/states/useTournamentStore";

interface InstructorListProps {
    masters: InvitedMasterT[]
}

const STATUS_TEXT: Record<InvitationStatus, string> = {
	[InvitationStatus.PENDING]: "Pendiente",
	[InvitationStatus.ACCEPTED]: "Aceptado",
    [InvitationStatus.EXPIRED]: "Expirada"
};

const statusIcon = (status: InvitationStatus) => {
    if (status === InvitationStatus.ACCEPTED) {
        return <IoCheckmarkCircleOutline className="text-green" size={18} />;
    }

    return <CiClock2 className="text-yellow" size={18} />;
};

const invitationForm = z.object({
    firstname: z.string().min(1, "El nombre es requerido"),
    lastname: z.string().min(1, "El apellido es requerido"),
    email: z.string().email("Email inválido"),
});
type InvitationFormValuesT = z.infer<typeof invitationForm>;

const InvitedMastersList = ({masters}:InstructorListProps) => {
    const { selectedInvitee, setSelectedInvitee, launchUpdateInvitees } = useManageInvites()
    const {tournament} = useTournamentStore()
    const [formValues, setFormValues] = useState<InvitationFormValuesT>({
        firstname: "",
        lastname: "",
        email: "",
    });
    
    const { validate, clearField, errors} = useFormValidation(invitationForm);
    const clearForm = () => {
        setFormValues({
            firstname: "",
            lastname: "",
            email: "",
        });
    }
    
    const handleInviteMaster = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        // Validate form values
        const result = validate(formValues);
        if (!result) {
            errorToast("Por favor, corrige los errores en el formulario.");
            return;
        }
        try{
            await inviteMaster(tournament.code, formValues)
            // Refetch + merge: trae la versión del server y appendea el nuevo
            // sin re-renderizar los que ya estaban.
            launchUpdateInvitees();
        }
        catch(e){
            errorToast((e as Error).message);
            return;
        }


        successToast("Invitación enviada.");
        clearForm();
    };


    return(									
        <div className="flex flex-col text-neutrallight transition-all rounded-lg gap-0.5">
            {masters.map((master) => {
                const isSelected = selectedInvitee?.uuid === master.uuid;

                return (
                    <div
                        key={master.uuid}
                        onClick={() => setSelectedInvitee(master)}
                        className={`w-full grid grid-cols-[1fr_1fr_auto] p-1 rounded-lg items-center gap-1 text-left px-1.5 transition-colors border border-transparent hover:cursor-pointer hover:border-orange hover:has-[.child:hover]:border-transparent
                            ${isSelected ? "border-orange!": ""}
                            rounded`}
                    >
                        <span className="">
                            {master.firstname} {master.lastname}
                        </span>
                        <span className=" text-muted italic">
                            {master.email}
                        </span>
                        <span className=" inline-flex items-center gap-0.5">
                            {statusIcon(master.status)}
                            {STATUS_TEXT[master.status]}
                        </span>
                    </div>
                );
            })}

            <form
                onSubmit={handleInviteMaster}
                className="grid grid-cols-3 gap-1.5 px-1.5 pt-1"
            >
                <FormInput
                    type="text"
                    name="name"
                    variant="primary"
                    placeholder="Nombre"
                    error={errors.firstname}
                    value={formValues.firstname}
                    onChange={(event) =>{
                        if(errors.firstname) clearField("firstname");
                        setFormValues((prev) => ({ ...prev, firstname: event.target.value }))
                    }
                    }
                />
                <FormInput
                    type="text"
                    name="lastname"
                    variant="primary"
                    placeholder="Apellido"
                    value={formValues.lastname}
                    error={errors.lastname}
                    onChange={(event) =>{
                        if(errors.lastname) clearField("lastname");
                        setFormValues((prev) => ({ ...prev, lastname: event.target.value }))
                    }
                    }

                />
                <FormInput
                    type="email"
                    name="email"
                    variant="primary"
                    placeholder="Email"
                    value={formValues.email}
                    error={errors.email}
                    onChange={(event) =>{
                        if(errors.email) clearField("email");
                        setFormValues((prev) => ({ ...prev, email: event.target.value }))
                    }
                    }

                />

                <div className="flex justify-start">
                    <Button 
                        className="w-full px-2.5"
                    >
                        <span className="inline-flex items-center gap-0.5 text-xs">
                            <LuUserPlus size={13} />
                            Invitar
                        </span>
                    </Button>
                </div>
            </form>
        </div>
    );
}
export default InvitedMastersList