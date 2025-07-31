import BeltIcon from "@/components/BeltIcon";
import { CompetitorSchema } from "@/types/schemas/primitiveSchemas";
import { getRankName } from "@/utils/utils";
import dayjs from "dayjs";
import { SingleValueProps, components } from "react-select";

const CustomSingleValue = (
    props: SingleValueProps<CompetitorSchema, false>
) => {
    const { data } = props;

    return (
        <components.SingleValue {...props}>
            <div
                className={`bg-elevated grid grid-cols-3 justify-items-center items-center gap-0.5 cursor-pointer transition-all rounded-lg ease-fluid
                hover:border-orange`}
            >
                <div className="flex items-center gap-1 w-full">
                    <div className="rounded-full font-black items-center bg-background flex h-3 w-3 justify-center text-orange uppercase">
                        {`${data.user.firstname.charAt(
                            0
                        )}${data.user.lastname.charAt(0)}`}
                    </div>
                    {`${data.user.firstname} ${data.user.lastname}`}
                </div>
                <div className="flex items-center gap-1">
                    <BeltIcon rank={data.user.rank} />{" "}
                    {getRankName(data.user.rank)}
                </div>
                {dayjs().diff(data.user.dob, "years").toString()} Años
            </div>
        </components.SingleValue>
    );
};

export default CustomSingleValue;
