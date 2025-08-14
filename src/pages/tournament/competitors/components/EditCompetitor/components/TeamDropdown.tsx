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
                                        Expulsar Miembro
                                    </DialogTitle>
                                    <div className="mt-1">
                                        <p className="text-md text-muted text-center">
                                            {`¿Estas seguro que quieres expulsar
											a `}
                                            <span className="text-neutrallight capitalize italic">{`${competitorDraft.user.firstname} ${competitorDraft.user.lastname} `}</span>
                                            del siguiente equipo?
                                            <br />
                                            <br />
                                            <span className="text-orange font-black">
                                                {"> "}
                                            </span>
                                            <span className="text-neutrallight capitalize">
                                                {team.name}
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
                <Disclosure as="div" className="w-full rounded-lg">
                    {({ open }) => (
                        <div>
                            {" "}
                            {/* root DOM real, no Fragment */}
                            <DisclosureButton
                                type="button" // <- importante, evita “doble click”
                                className="group flex w-full items-center justify-between px-2 py-1 font-medium
                                    cursor-pointer
                                    rounded-lg border border-transparent hover:border-orange focus:outline-none"
                            >
                                <span className="flex items-center capitalize gap-1 text-xl">
                                    {team.name}
                                    <FaUsers size={26} />
                                </span>
                                <ChevronDown
                                    className={`w-3 h-3 text-orange transition-transform duration-200 ${
                                        open ? "rotate-180" : ""
                                    }`}
                                />
                            </DisclosureButton>
                            <Transition
                                as={Fragment}
                                enter="transition duration-300 ease-out"
                                enterFrom="transform scale-y-0 opacity-0 origin-top"
                                enterTo="transform scale-y-100 opacity-100 origin-top"
                                leave="transition duration-200 ease-in"
                                leaveFrom="transform scale-y-100 opacity-100 origin-top"
                                leaveTo="transform scale-y-0 opacity-0 origin-top"
                            >
                                {/* Dejá que Transition maneje el montaje, no uses show={open} */}
                                <DisclosurePanel className="mt-2">
                                    <ul className="grid grid-cols-[1fr_1fr_1fr_auto] px-3 py-0.5 justify-items-center items-center font-bold gap-y-1">
                                        {userCompetitors
                                            .filter((c) =>
                                                c.teams.some(
                                                    (t) => t.uuid === team.uuid
                                                )
                                            )
                                            .map((comp) => (
                                                <Fragment key={comp.uuid}>
                                                    {/* Fullname */}
                                                    <div className="flex items-center justify-start w-full gap-1">
                                                        <div className="rounded-full font-black bg-background flex h-3 w-3 items-center justify-center text-orange uppercase">
                                                            {`${comp.user.firstname.charAt(
                                                                0
                                                            )}${comp.user.lastname.charAt(
                                                                0
                                                            )}`}
                                                        </div>
                                                        <div className="font-semibold capitalize">
                                                            {`${comp.user.firstname} ${comp.user.lastname}`}
                                                        </div>
                                                    </div>

                                                    {/* Rank */}
                                                    <div className="flex items-center justify-center w-full">
                                                        <BeltIcon
                                                            rank={
                                                                comp.user.rank
                                                            }
                                                        />
                                                    </div>

                                                    {/* Age */}
                                                    <div className="flex w-full justify-center items-center">
                                                        {dayjs().diff(
                                                            comp.user.dob,
                                                            "years"
                                                        )}{" "}
                                                        Años
                                                    </div>

                                                    {/* Acción */}
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
                                                        <span />
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
