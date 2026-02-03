import { useEffect, useState } from "react";
import { useManageCompetitors } from "../../ManageCompetitorContext";
import MemberCompetitor from "./MemberCompetitor";
import SelectTeamCompetitors from "./SelectTeamCompetitors/SelectTeamCompetitors";
import { UserPlus } from "lucide-react";
import Button from "@/components/Button";
import {
    addCompetitorsToTeamPayload,
    addCompetitorsToTeamResponse,
} from "@/types/schemas/teamServiceSchemas";
import { addCompetitorToTeam } from "@/services/teamService";
import { errorToast, successToast } from "@/services/toasts";
import { ManageModes } from "@/types/enums";

const Members = () => {
    const {
        userCompetitors,
        teamDraft,
        selectedMembers,
        setSelectedMembers,
        updateCompetitors,
        updateTeams,
        mode,
    } = useManageCompetitors();
    const [teamCompetitors, setTeamCompetitors] = useState(
        userCompetitors.filter((comp) =>
            teamDraft.competitors.some((member) => member === comp.uuid)
        )
    );
    const handleAddCompetitors = async () => {
        try {
            const formData = {
                competitor_uuids: selectedMembers.map((sm) => sm.uuid),
            };
            const result = addCompetitorsToTeamPayload.safeParse(formData);
            if (!result.success) {
                // Mostrar errores al usuario
                console.log(result.error);
                return;
            }

            const addCompetitorsResponse = await addCompetitorToTeam(
                teamDraft.uuid,
                result.data
            );
            const res = addCompetitorsToTeamResponse.parse(
                addCompetitorsResponse
            );

            // Reset and update components states.
            updateCompetitors(res.competitors);
            updateTeams(res.team);

            setSelectedMembers([]);

            successToast("Competidores agregados exitosamente.");
        } catch (error: any) {
            errorToast(error.message);
            errorToast(
                "Hubo un error al agrear el/los competidores al equipo."
            );
        }
    };

    useEffect(() => {
        setTeamCompetitors(
            userCompetitors.filter((comp) =>
                teamDraft.competitors.some((member) => member === comp.uuid)
            )
        );
    }, [teamDraft, userCompetitors]);
    const canAddCompetitor =
        teamCompetitors.length + selectedMembers.length <
        userCompetitors.length;
    return (
        <>
            <h1 className="font-extrabold text-2xl">Miembros</h1>
            <div className="flex flex-col gap-1 overflow-y-auto flex-1 pr-1">
                {teamCompetitors.map((competitor) => {
                    return (
                        <MemberCompetitor
                            key={competitor.uuid}
                            competitor={competitor}
                        />
                    );
                })}
                {selectedMembers.map((member) => (
                    <SelectTeamCompetitors
                        key={member.id}
                        id={member.id}
                        value={member.uuid}
                    />
                ))}
                {canAddCompetitor && (
                    <div
                        className={`flex gap-1 px-1 py-0.5 cursor-pointer rounded-lg italic text-muted border border-transparent hover:border-orange transition-all ease-fluid justify-items-center items-center font-bold`}
                        onClick={() => {
                            setSelectedMembers([
                                ...selectedMembers,
                                {
                                    id: crypto.randomUUID(),
                                    uuid: "",
                                },
                            ]);
                        }}
                    >
                        <UserPlus size={30} />
                        Agregar nuevo competidor
                    </div>
                )}
            </div>
            {selectedMembers.length && //Si hay miembros
            selectedMembers.every((sm) => sm.uuid.length > 10) && // Todos estan seleccionados
            mode !== ManageModes.CREATE ? (
                <div className="flex w-full justify-end">
                    <Button
                        onClick={handleAddCompetitors}
                        iconLeft={<UserPlus />}
                    >
                        Agregar Competidores
                    </Button>
                </div>
            ) : null}
        </>
    );
};

export default Members;
