import BeltIcon from "@/components/BeltIcon";
import { getRankName } from "@/utils/utils";
import dayjs from "dayjs";
import { useManageCompetitors } from "../ManageCompetitorContext";
import { ChevronDown } from "lucide-react";
import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Transition,
} from "@headlessui/react";
import { FaUsers } from "react-icons/fa";
import { Fragment } from "react/jsx-runtime";
import UserX from "@/components/icons/UserX";
import TeamDropdown from "./components/TeamDropdown";

const EditCompetitor = ({}) => {
    const { competitorDraft, userCompetitors } = useManageCompetitors();
    return (
        <>
            <div className="bg-elevated flex flex-col gap-2 shadow-lg justify-center p-3 rounded-lg">
                <div className="flex flex-col gap-3">
                    <h1 className="font-extrabold text-2xl">
                        Información Personal
                    </h1>
                    <div className="flex gap-2">
                        <div
                            className="flex-shrink-0 flex rounded-full justify-center items-center bg-background text-orange text-5xl"
                            style={{
                                height: "130px",
                                width: "130px",
                            }}
                        >
                            {`${competitorDraft.user.firstname
                                .charAt(0)
                                .toUpperCase()}${competitorDraft.user.lastname
                                .charAt(0)
                                .toUpperCase()}`}
                        </div>
                        <div className="grid grid-cols-2 gap-2 flex-1 items-center">
                            <div className="flex items-center gap-1">
                                <span className="text-muted">Nombre</span>
                                {competitorDraft.user.firstname}
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="text-muted">Graduación</span>
                                <BeltIcon rank={competitorDraft.user.rank} />
                                {getRankName(competitorDraft.user.rank)}
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="text-muted">
                                    Fecha de Nacimiento
                                </span>
                                {dayjs(competitorDraft.user.dob)
                                    .locale("es")
                                    .format("D MMMM YYYY")}
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="text-muted">DNI</span>
                                {competitorDraft.user.id_number}
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-1">
                        <h1 className="font-extrabold text-2xl">Equipos</h1>
                    </div>

                    {competitorDraft.teams.map((competitorTeam) => (
                        <TeamDropdown
                            key={crypto.randomUUID()}
                            team={competitorTeam}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default EditCompetitor;
