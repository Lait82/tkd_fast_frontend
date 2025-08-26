import { CategorySchema } from "@/types/schemas/primitiveSchemas";
import { Fragment, useState } from "react";
import { useManageCompetitors } from "./ManageCompetitorContext";
import { removeEnrollmentToCategory } from "@/services/competitorService";
import { errorToast, successToast } from "@/services/toasts";
import {
    Dialog,
    DialogPanel,
    DialogTitle,
    Transition,
    TransitionChild,
} from "@headlessui/react";
import Button from "@/components/Button";
import IconsCategoryName from "@/components/IconsCategoryName";
import { Trash2 } from "lucide-react";
import { buildCategoryName } from "@/utils/utils";
import Modal from "@/components/Modal";
import { ManageCompetitorTypes } from "@/types/enums";

const EnrolledCategory = ({ category }: { category: CategorySchema }) => {
    let [isOpen, setIsOpen] = useState(false);
    const {
        competitorDraft,
        updateCompetitors,
        updateTeams,
        teamDraft,
        manageType,
    } = useManageCompetitors();
    // const inscription = competitorDraft.inscriptions.find(
    //     (inscription) => inscription.category_uuid === category.uuid
    // );

    const [inscription, setInscription] = useState(); // NOTA DE ACCION: implementar uuid de inscripcion en todos lados donde aparezca teamSchema y en el back.

    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }

    const handleButtonClick = async () => {
        try {
            // const inscriptionUuid = inscription?.uuid;
            // if (!inscriptionUuid) return;

            await removeEnrollmentToCategory(inscriptionUuid);

            // Remove de la inscripcion eliminada.
            if (manageType === ManageCompetitorTypes.COMPETITOR) {
                updateCompetitors({
                    ...competitorDraft,
                    inscriptions: competitorDraft.inscriptions.filter(
                        (inscription) => inscription.uuid !== inscriptionUuid
                    ),
                });
            } else if (manageType === ManageCompetitorTypes.TEAM) {
                updateTeams;
            }
            successToast("Inscripción eliminada correctamente.");
        } catch (error) {
            errorToast(
                "Ha ocurrido un error al eliminar la inscripción a la categoría, por favor intenta de nuevo."
            );
        }

        closeModal();
    };

    const getDraftName = (currentManageType: ManageCompetitorTypes) => {
        const ret = {
            [ManageCompetitorTypes.COMPETITOR]:
                competitorDraft.user.firstname +
                " " +
                competitorDraft.user.lastname,
            [ManageCompetitorTypes.TEAM]: teamDraft.name,
        };
    };
    return (
        <div
            className={`flex items-center w-full px-1 py-1.5 font-bold justify-between  transition-all ease-fluid border 
                                    border-transparent rounded-lg`}
        >
            <IconsCategoryName category={category} />

            <Modal
                title="Eliminar Inscripción"
                isOpen={isOpen}
                closeModal={closeModal}
            >
                <p className="text-md text-muted text-center">
                    {`¿Estas seguro que quieres eliminar
											la inscripción de `}
                    <span className="text-neutrallight capitalize italic">{`${competitorDraft.user.firstname} ${competitorDraft.user.lastname} `}</span>
                    a la siguiente categoria?
                    <br />
                    <br />
                    <span className="text-orange font-black">{"> "}</span>
                    <span className="text-neutrallight">
                        {buildCategoryName(category)}
                    </span>
                </p>

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
                            handleButtonClick();
                            closeModal();
                        }}
                    >
                        Estoy seguro
                    </Button>
                </div>
            </Modal>
            <Trash2
                onClick={openModal}
                size={30}
                className="transition-all ease-fluid fill-transparent stroke-red hover:transition-all hover:ease-fluid hover:fill-red cursor-pointer"
            />
        </div>
    );
};

export default EnrolledCategory;
