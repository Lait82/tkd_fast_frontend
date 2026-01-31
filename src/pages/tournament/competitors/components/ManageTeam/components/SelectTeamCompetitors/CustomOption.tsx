import BeltIcon from "@/components/icons/BeltIcon";
import { CompetitorSchema } from "@/types/schemas/primitiveSchemas";
import dayjs from "dayjs";
import { OptionProps } from "react-select";

const CustomOption = (props: OptionProps<CompetitorSchema, false>) => {
    const { data, innerRef, innerProps, isSelected } = props;
    return (
        <div
            className={`bg-elevated p-1 grid grid-cols-3 justify-items-center items-center gap-0.5 cursor-pointer border transition-all rounded-lg ease-fluid
                ${isSelected ? "border-orange" : "border-transparent"}
                hover:border-orange`}
            ref={innerRef}
            {...innerProps}
        >
            <div className="flex items-center gap-2 w-full">
                <div className="rounded-full font-black items-center bg-background flex h-3 w-3 justify-center text-orange uppercase">
                    {`${data.user.firstname.charAt(
                        0
                    )}${data.user.lastname.charAt(0)}`}
                </div>
                {`${data.user.firstname} ${data.user.lastname}`}
            </div>
            <BeltIcon rank={data.user.rank} />{" "}
            {dayjs().diff(data.user.dob, "years").toString()} Años
        </div>
    );
};

export default CustomOption;
