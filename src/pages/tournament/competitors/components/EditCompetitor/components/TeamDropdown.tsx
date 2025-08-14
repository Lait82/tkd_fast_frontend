import BeltIcon from "@/components/BeltIcon";
import UserX from "@/components/icons/UserX";
import {
    Dialog,
    DialogPanel,
    DialogTitle,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Transition,
    TransitionChild,
} from "@headlessui/react";
import dayjs from "dayjs";
import { ChevronDown } from "lucide-react";
import { FaUsers } from "react-icons/fa";
import { useManageCompetitors } from "../../ManageCompetitorContext";
import { Fragment, useState } from "react";
import { CompetitorTeamSchema } from "@/types/schemas/primitiveSchemas";
import Button from "@/components/Button";
import { errorToast, successToast } from "@/services/toasts";

interface TeamDropdownProps {
    team: CompetitorTeamSchema;
}

const TeamDropdown = ({ team }: TeamDropdownProps) => {
    const { competitorDraft, userCompetitors } = useManageCompetitors();
    const [isOpen, setIsOpen] = useState<boolean>(false);

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

            // await removeEnrollmentToCategory(inscriptionUuid);

            // // Remove de la inscripcion eliminada.
            // setCompetitorDraft({
            //     ...competitorDraft,
            //     inscriptions: competitorDraft.inscriptions.filter(
            //         (inscription) => inscription.uuid !== inscriptionUuid
            //     ),
            // });

            successToast(`funciona? ${team.name}`);
        } catch (error) {
            errorToast(
                "Ha ocurrido un error al eliminar la inscripción del competidor, por favor intenta de nuevo."
            );
        }

        closeModal();
    };

    return (
        <Fragment>
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
											a `}
                                            <span className="text-neutrallight capitalize italic">{`${competitorDraft.user.firstname} ${competitorDraft.user.lastname} `}</span>
                                            del siguiente equipo?
                                            <br />
                                            <br />
                                            <span className="text-orange font-black">
                                                {"> "}
                                            </span>
                                            <span className="text-neutrallight">
                                                Equipo nombre
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
                                                handleButtonClick();
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
            <div className="w-full rounded-lg">
                <Disclosure>
                    {({ open }) => (
                        <div>
                            <DisclosureButton className={`flex w-full`}>
                                <div
                                    className={`flex transition-all ease-fluid justify-between items-center hover:cursor-pointer w-full px-2 py-1 font-medium 
                                            focus:outline-none 
                                            focus-visible:outline-none
                                            border 
                                            border-transparent
                                                    rounded-lg
                                            hover:border-orange
                                             `}
                                >
                                    <span className="flex items-center capitalize gap-1 text-xl">
                                        {team.name}
                                        {/* <BoxingGloves size={10} />{" "} */}
                                        <FaUsers size={26} />
                                    </span>
                                    <ChevronDown
                                        className={`w-2 h-2 transition-transform text-orange duration-200 ${
                                            open ? "rotate-180" : ""
                                        }`}
                                    />
                                </div>
                                {/* <span
                                                className={`flex min-w-fit rounded-lg bg-super-elevated p-1  items-center justify-center`}
                                            >
                                                <Edit />
                                                Ver Equipo
                                            </span> */}
                            </DisclosureButton>
                            <Transition
                                show={open}
                                enter="transition duration-300 ease-out"
                                enterFrom="transform scale-y-0 opacity-0 origin-top"
                                enterTo="transform scale-y-100 opacity-100 origin-top"
                                leave="transition duration-200 ease-in"
                                leaveFrom="transform scale-y-100 opacity-100 origin-top"
                                leaveTo="transform scale-y-0 opacity-0 origin-top"
                            >
                                <DisclosurePanel
                                    className={`${open && "mt-2"}`}
                                >
                                    <ul
                                        className={`space-y-1 transition-all ease-fluid
                                                        grid grid-cols-[1fr_1fr_1fr_auto] px-3 py-0.5 justify-items-center items-center font-bold
                                                        `}
                                    >
                                        {userCompetitors
                                            .filter((competitor) =>
                                                competitor.teams.some(
                                                    (compTeam) =>
                                                        compTeam.uuid ===
                                                        team.uuid
                                                )
                                            )
                                            .map((comp) => (
                                                <Fragment
                                                // key={comp.uuid}
                                                // className={``}
                                                >
                                                    {/* Fullname */}
                                                    <div className="flex items-center justify-start w-full gap-1">
                                                        <div className="rounded-full font-black items-center bg-background flex h-3 w-3 justify-center text-orange uppercase">
                                                            {`${comp.user.firstname.charAt(
                                                                0
                                                            )}${comp.user.lastname.charAt(
                                                                0
                                                            )}`}
                                                        </div>
                                                        <div className="font-semibold capitalize">{`${comp.user.firstname} ${comp.user.lastname}`}</div>
                                                    </div>

                                                    {/* Rank */}
                                                    <div className="flex items-center justify-center w-full gap-1">
                                                        <BeltIcon
                                                            rank={
                                                                comp.user.rank
                                                            }
                                                        />
                                                    </div>

                                                    {/* Age */}
                                                    <div className="flex w-full justify-center items-center">
                                                        {dayjs()
                                                            .diff(
                                                                comp.user.dob,
                                                                "years"
                                                            )
                                                            .toString()}{" "}
                                                        Años
                                                    </div>
                                                    {comp.uuid ===
                                                    competitorDraft.uuid ? (
                                                        <div className="flex w-full justify-end items-center">
                                                            <UserX
                                                                onClick={
                                                                    openModal
                                                                }
                                                                className="text-red hover:text-red transition-colors cursor-pointer"
                                                                size={32}
                                                            />
                                                        </div>
                                                    ) : (
                                                        <span></span>
                                                    )}
                                                </Fragment>
                                            ))}
                                    </ul>
                                </DisclosurePanel>
                            </Transition>
                        </div>
                    )}
                </Disclosure>
            </div>
        </Fragment>
    );
};

export default TeamDropdown;
