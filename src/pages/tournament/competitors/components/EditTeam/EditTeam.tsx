import { useManageCompetitors } from "../ManageCompetitorContext";
import SelectTeamCompetitors from "./SelectTeamCompetitors/SelectTeamCompetitors";
import MemberCompetitor from "./MemberCompetitor";
import { Edit, Trash2, UserPlus } from "lucide-react";
import Button from "@/components/Button";
import { errorToast, successToast } from "@/services/toasts";
import {
    addCompetitorsToTeamResponse,
    addCompetitorsToTeamPayload,
} from "@/types/schemas/teamServiceSchemas";
import { addCompetitorToTeam } from "@/services/teamService";
import { Fragment, useEffect, useState } from "react";
import {
    Dialog,
    DialogPanel,
    DialogTitle,
    Transition,
    TransitionChild,
} from "@headlessui/react";
import Tooltip from "@/components/Tooltip";

const EditTeam = ({}) => {
    const {
        teamDraft,
        selectedMembers,
        setSelectedMembers,
        userCompetitors,
        updateCompetitorsList,
        updateTeamsList,
    } = useManageCompetitors();

    const [teamCompetitors, setTeamCompetitors] = useState(
        userCompetitors.filter((comp) =>
            teamDraft.competitors.some((member) => member === comp.uuid)
        )
    );
    const [isOpen, setIsOpen] = useState(false);
    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }

    // const handleButtonClick = async () => {
    //     try {
    //         const inscriptionUuid = inscription?.uuid;
    //         if (!inscriptionUuid) return;

    //         await removeEnrollmentToCategory(inscriptionUuid);

    //         // Remove de la inscripcion eliminada.
    //         setCompetitorDraft({
    //             ...competitorDraft,
    //             inscriptions: competitorDraft.inscriptions.filter(
    //                 (inscription) => inscription.uuid !== inscriptionUuid
    //             ),
    //         });
    //         successToast("Inscripción eliminada correctamente.");
    //     } catch (error) {
    //         errorToast(
    //             "Ha ocurrido un error al eliminar la inscripción del competidor, por favor intenta de nuevo."
    //         );
    //     }

    //     closeModal();
    // };
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
            updateCompetitorsList(res.competitors);
            updateTeamsList(res.team);

            setSelectedMembers([]);

            successToast("Competidores agregados exitosamente.");
        } catch (error: any) {
            errorToast(error.message);
            errorToast(
                "Hubo un error al agrear el/los competidores al equipo."
            );
        }
    };
    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25" />
                    </TransitionChild>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <TransitionChild
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-super-elevated p-4 text-left align-middle shadow-xl transition-all">
                                    <DialogTitle
                                        as="h3"
                                        className="text-2xl gap-1 font-extrabold text-neutrallight flex w-full justify-center"
                                    >
                                        Eliminar Inscripción
                                    </DialogTitle>
                                    <div className="mt-1">
                                        <p className="text-md text-muted text-center">
                                            {`¿Estas seguro que quieres eliminar
											el siguiente equipo?: `}
                                            <br />
                                            <br />
                                            <span className="text-orange font-black">
                                                {"> "}
                                            </span>
                                            <span className="text-neutrallight capitalize italic">
                                                {teamDraft.name}
                                            </span>
                                        </p>
                                    </div>

                                    <div className="flex mt-1.5 gap-2 justify-between">
                                        <Button
                                            variant="secondary"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                closeModal();
                                            }}
                                        >
                                            Cerrar
                                        </Button>
                                        <Button
                                            variant="primary"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                // handleButtonClick();
                                                closeModal();
                                            }}
                                        >
                                            Estoy seguro
                                        </Button>
                                    </div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
            <div className="bg-elevated flex flex-col gap-2 shadow-lg justify-center p-3 rounded-lg">
                <div className="flex flex-col gap-3">
                    <div className="flex w-full justify-between items-center">
                        <h1 className="font-extrabold text-2xl">
                            Editar equipo
                        </h1>
                        <div className="flex items-center">
                            <Tooltip text="Editar">
                                <Edit className="transition-all hover:text-orange" />
                            </Tooltip>
                            <Tooltip text="Eliminar equipo">
                                <Trash2
                                    size={30}
                                    className="transition-all ease-fluid fill-transparent stroke-red hover:transition-all hover:ease-fluid hover:fill-red cursor-pointer"
                                    onClick={openModal}
                                />
                            </Tooltip>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <div
                            className="flex-shrink-0 flex rounded-full justify-center uppercase items-center bg-background text-orange text-5xl"
                            style={{
                                height: "130px",
                                width: "130px",
                            }}
                        >
                            {`${teamDraft.name
                                .split(" ")
                                .slice(0, 3)
                                .map((word) => word.charAt(0))
                                .join("")}`}
                        </div>
                        <div className="grid grid-cols-2 gap-2 flex-1 items-center">
                            <div className="flex items-center gap-1">
                                <span className="text-muted">Nombre</span>
                                {teamDraft.name}
                            </div>
                        </div>
                    </div>
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
                    {selectedMembers.length &&
                    selectedMembers.every((sm) => sm.uuid.length > 10) ? (
                        <div className="flex w-full justify-end">
                            <Button
                                onClick={handleAddCompetitors}
                                iconLeft={<UserPlus />}
                            >
                                Agregar Competidores
                            </Button>
                        </div>
                    ) : null}
                </div>
            </div>
        </>
    );
};

export default EditTeam;
