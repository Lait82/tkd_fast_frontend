import { useManageCompetitors } from "./ManageCompetitorContext";
import BeltIcon from "@/components/BeltIcon";
import dayjs from "dayjs";
import { getRankName } from "@/utils/utils";
import { Checkbox, Field, Label } from "@headlessui/react";

const SelectTeamCompetitors = () => {
    const { userCompetitors, selectedMembers, setSelectedMembers } =
        useManageCompetitors();

    const handleToggle = (competitorUuid: string) => {
        // const currentSelectedMembers: string[] = Array.from(userCompetitors);

        const updated = selectedMembers.includes(competitorUuid)
            ? selectedMembers.filter((uuid) => uuid !== competitorUuid)
            : [...selectedMembers, competitorUuid]; // sino la agrego.

        setSelectedMembers(updated);
    };
    console.log(selectedMembers);
    return (
        <div className="flex flex-col gap-2">
            <h1 className="font-extrabold text-2xl">Miembros</h1>
            <div className="flex flex-col gap-2">
                {userCompetitors.map((competitor, i) => (
                    <Field>
                        <Label
                            key={`${i}-category`}
                            className={`grid grid-cols-3 px-1 py-0.5 rounded-lg transition-all ease-fluid cursor-pointer justify-items-center items-center font-bold border-1 
                                border-transparent
                            hover:border-orange`}
                            onClick={() => handleToggle(competitor.uuid)}
                        >
                            {/* Fullname */}
                            <div className="flex items-center justify-start w-full gap-1">
                                <div className="rounded-full font-black items-center bg-background flex h-3 w-3 justify-center text-orange uppercase">
                                    {`${competitor.user.firstname.charAt(
                                        0
                                    )}${competitor.user.lastname.charAt(0)}`}
                                </div>
                                <div className="font-semibold capitalize">{`${competitor.user.firstname} ${competitor.user.lastname}`}</div>
                            </div>

                            {/* Rank */}
                            <div className="flex items-center justify-start pl-[20%] w-full gap-1">
                                <BeltIcon
                                    className="flex-shrink-0"
                                    key={`${i}-belt`}
                                    rank={competitor.user.rank}
                                />
                                <div className="flex-grow">
                                    {getRankName(competitor.user.rank)}
                                </div>
                            </div>

                            {/* Age and form item*/}
                            <div className="flex gap-1 w-full items-center">
                                <div className="flex w-full justify-center">
                                    {dayjs()
                                        .diff(competitor.user.dob, "years")
                                        .toString()}{" "}
                                    Años
                                </div>
                                <Checkbox
                                    checked={selectedMembers.includes(
                                        competitor.uuid
                                    )}
                                    // name={`category-${category.id}`}
                                    onChange={() =>
                                        handleToggle(competitor.uuid)
                                    }
                                    className="group block flex-shrink-0 size-2 rounded border bg-transparent border-neutrallight data-checked:border-orange
                                focus:outline-none focus:ring-0"
                                >
                                    <svg
                                        className="stroke-orange opacity-0 group-data-checked:opacity-100"
                                        viewBox="0 0 14 14"
                                        fill="none"
                                    >
                                        <path
                                            d="M3 8L6 11L11 3.5"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </Checkbox>
                            </div>
                        </Label>
                    </Field>
                ))}
            </div>
        </div>
    );
};
export default SelectTeamCompetitors;
