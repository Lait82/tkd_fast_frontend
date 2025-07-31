import { Field, Label } from "@headlessui/react";
import { useManageCompetitors } from "../ManageCompetitorContext";
import { CompetitorSchema } from "@/types/schemas/primitiveSchemas";
import BeltIcon from "@/components/BeltIcon";
import { getRankName } from "@/utils/utils";
import dayjs from "dayjs";
import Checkbox from "@/components/forms/Checkbox";

interface AvailableCompetitorProps {
    competitor: CompetitorSchema;
}

const AvailableCompetitor = ({ competitor }: AvailableCompetitorProps) => {
    const { selectedMembers, setSelectedMembers } = useManageCompetitors();

    const handleToggle = (competitorUuid: string) => {
        // const currentSelectedMembers: string[] = Array.from(userCompetitors);

        const updated = selectedMembers.includes(competitorUuid)
            ? selectedMembers.filter((uuid) => uuid !== competitorUuid)
            : [...selectedMembers, competitorUuid]; // sino la agrego.

        setSelectedMembers(updated);
    };
    return (
        <Field>
            <Label
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
                        // key={`${i}-belt`}
                        rank={competitor.user.rank}
                    />
                    <div className="flex-grow">
                        {getRankName(competitor.user.rank)}
                    </div>
                </div>

                {/* Age and form item*/}
                <div className="flex gap-1 w-full items-center">
                    <div className="flex w-full justify-center">
                        {dayjs().diff(competitor.user.dob, "years").toString()}{" "}
                        Años
                    </div>
                    <Checkbox
                        checked={selectedMembers.includes(competitor.uuid)}
                        onChange={() => handleToggle(competitor.uuid)}
                    />
                </div>
            </Label>
        </Field>
    );
};

export default AvailableCompetitor;
