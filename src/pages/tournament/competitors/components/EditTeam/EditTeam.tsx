import BeltIcon from "@/components/BeltIcon";
import { getRankName } from "@/utils/utils";
import dayjs from "dayjs";
import { useManageCompetitors } from "../ManageCompetitorContext";
import SelectTeamCompetitors from "./SelectTeamCompetitors/SelectTeamCompetitors";
import { useEffect } from "react";
import MemberCompetitor from "./MemberCompetitor";
import { Cross, UserPlus, X } from "lucide-react";

const EditTeam = ({}) => {
    const { teamDraft, selectedMembers, setSelectedMembers, userCompetitors } =
        useManageCompetitors();

    const getPendingCompetitorSlots = () =>
        teamDraft.uuid
            ? selectedMembers
                  .map((val, idx) => ({ val, idx }))
                  .filter(({ val }) => !val)
            : [];

    const removePendingCompetitorSlot = (indexToRemove: number) => {
        //DEBUGEAR ESTO PORQUE NO BORRA LAS SELECCIONES Y AL CREAR UN SELECT NUEVO NO TE DA OPCIONES SI SE AGOTARON.
        const updated = selectedMembers.filter(
            (_, idx) => idx !== indexToRemove
        );
        setSelectedMembers(updated);
    };
    return (
        <div className="bg-elevated flex flex-col gap-2 shadow-lg justify-center p-3 rounded-lg">
            <div className="flex flex-col gap-3">
                <h1 className="font-extrabold text-2xl">Editar equipo</h1>
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
                    {userCompetitors
                        .filter((comp) =>
                            teamDraft.competitors.some(
                                (member) => member === comp.uuid
                            )
                        )
                        .map((competitor) => {
                            return <MemberCompetitor competitor={competitor} />;
                        })}
                    {getPendingCompetitorSlots().map(({ idx }, i) => (
                        <div
                            key={`pending-${idx}`}
                            className="flex px-1 gap-2 items-center"
                        >
                            <SelectTeamCompetitors />
                            <X
                                size={30}
                                className="text-red cursor-pointer"
                                onClick={() => removePendingCompetitorSlot(idx)}
                            />
                        </div>
                    ))}
                    <div
                        className={`flex gap-1 px-1 py-0.5 cursor-pointer rounded-lg italic text-muted border border-transparent hover:border-orange transition-all ease-fluid justify-items-center items-center font-bold`}
                        onClick={() => {
                            setSelectedMembers([...selectedMembers, ""]);
                        }}
                    >
                        <UserPlus size={30} />
                        Agregar nuevo competidor
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditTeam;
