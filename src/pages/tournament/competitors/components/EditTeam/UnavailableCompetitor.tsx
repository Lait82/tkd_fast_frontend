import { Field, Label } from "@headlessui/react";
import { CompetitorSchema } from "@/types/schemas/primitiveSchemas";
import BeltIcon from "@/components/BeltIcon";
import { getRankName } from "@/utils/utils";
import dayjs from "dayjs";
import { CrossIcon } from "lucide-react";
import { RiProhibitedLine } from "react-icons/ri";

interface AvailableCompetitorProps {
    competitor: CompetitorSchema;
}

const UnavailableCompetitor = ({ competitor }: AvailableCompetitorProps) => {
    return (
        <Field>
            <Label
                className={`grid grid-cols-3 grayscale-75 px-1 py-0.5 cursor-not-allowed justify-items-center items-center font-bold`}
                // onClick={() => handleToggle(competitor.uuid)}
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
                    <RiProhibitedLine className="text-muted" size={30} />
                </div>
            </Label>
        </Field>
    );
};

export default UnavailableCompetitor;
