import { useManageCompetitors } from "../ManageCompetitorContext";
import { Edit, Trash2 } from "lucide-react";
import Button from "@/components/Button";
import { useState } from "react";
import Tooltip from "@/components/Tooltip";
import Members from "./components/Members";
import Modal from "@/components/Modal";

const EditTeam = ({}) => {
    const { teamDraft } = useManageCompetitors();
    const [isOpen, setIsOpen] = useState(false);
    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }

    return (
        <>
            <div className="bg-elevated flex flex-col gap-2 shadow-lg justify-center p-3 rounded-lg">
                <div className="flex flex-col gap-3">
                    <div className="flex w-full justify-between items-center">
                        <h1 className="font-extrabold text-2xl">
                            Editar equipo
                        </h1>
                        <div className="flex items-center gap-1.5">
                            <Tooltip text="Editar">
                                <Edit className="transition-all cursor-pointer hover:text-orange" />
                            </Tooltip>

                            {/* Delete Team Modal */}
                            <Modal
                                isOpen={isOpen}
                                closeModal={closeModal}
                                title="Eliminar equipo"
                            >
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
                            </Modal>
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
                    <Members />
                </div>
            </div>
        </>
    );
};

export default EditTeam;
