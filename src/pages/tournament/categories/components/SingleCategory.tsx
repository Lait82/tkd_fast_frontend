import BeltIcon from "@/components/icons/BeltIcon";
// import BoxingGloves from "@/components/icons/BoxingGloves";
import { CategorySchema } from "@/types/schemas/primitiveSchemas";
import { getDisciplineLabel, getGenderLabel, getIsTeamLabel, getRankName } from "@/utils/utils";
import { FaMedal, FaUsers } from "react-icons/fa";
import "../../../../styles/Categories.css"
import { Discipline } from "@/types/enums";
import Tooltip from "@/components/Tooltip";

interface SingleCategoryProps {
    category: CategorySchema;
}

const SingleCategory = ({category} : SingleCategoryProps) => {
    const isPatternsCategory = category.discipline !== Discipline.PATTERNS

    return (
        <>
                {/* Description */}
                <div className={`flex flex-col col-span-1 rounded-l-md pl-1.5 pt-1.5 pb-1 gap-1 h-full ${(category.discipline).toString().toLowerCase()}`}>
                    <div className="flex">
                        <span className="text-2xl md:text-3xl font-bold">
                            {`${getGenderLabel(category.gender)} ${getDisciplineLabel(category.discipline)} ${getIsTeamLabel(category.is_team)}`}

                        </span>
                    </div>
                    <div className="flex items-center">
                        <div className="grid grid-cols-[auto_1fr] ml-1 text-neutrallight rounded-3xl justify-around gap-y-1.5 gap-x-1">
                            <FaMedal className="ml-[0.4rem]"/> 3er Puesto definido por lucha
                        </div>

                    </div>
                </div>

                {/* Age */}
                <div className="flex flex-col col-span-1 gap-0.5 justify-start py-1.5 bg-super-elevated">
                    Edad:
                    <div className="flex flex-col ml-1 text-muted justify-around gap-1.5">
                        <div className="flex min-w-fit max-w-[5rem] items-center justify-between gap-0.5">
                            <span className="text-neutrallight">{category.min_age}</span>
                            <span className="text-3xl">→</span>
                            <span className="text-neutrallight">{category.max_age} Años</span>
                        </div>
                    </div>
                </div>

                {/* Weight */}
                {
                    <div className="flex flex-col col-span-1 gap-0.5 justify-start py-1.5 bg-super-elevated">
                        Peso:
                        { isPatternsCategory ?
                                <div className="flex min-w-fit max-w-[5rem] items-center justify-between gap-0.5 ml-1">
                                    <span className="text-neutrallight">{category.min_weight}</span>
                                    <span className="text-3xl">→</span>
                                    <span className="text-neutrallight">{category.max_weight} Kg</span>
                                </div>
                            :
                            <span className="text-muted italic ml-1"> N/A </span>
                        }
                    </div>
                }

                {/* Rank and total competitors */}
                <div className="flex flex-col col-span-1 gap-0.5 justify-start pb-1 pt-1.5 bg-super-elevated">
                    Categoria:
                    <div className="flex ml-1 text-muted gap-0.5 justify-around">
                        <div className="flex flex-col min-w-0 items-center gap-1 justify-between">
                            <BeltIcon size={19} rank={category.min_rank} />
                            <span className="text-neutrallight truncate">{getRankName(category.min_rank)}</span>
                        </div>
                        <span className="flex text-3xl items-center">→</span>
                        <div className="flex flex-col min-w-0 items-center gap-1 justify-between">
                            <BeltIcon size={19} rank={category.max_rank} />
                            <span className="text-neutrallight truncate">{getRankName(category.max_rank)}</span>
                        </div>
                    </div>
                </div>

                <div className="flex rounded-r-md justify-end bg-super-elevated pr-1.5 pt-1.5">
                    <Tooltip text="27 competidores inscriptos">
                        <span className="flex w-fit h-fit text-sm gap-0.5 px-1 py-0.5 cursor-pointer text-muted rounded-full bg-elevated">
                                <FaUsers size={20} className="transition-all cursor-pointer " />    
                                27
                        </span>
                    </Tooltip>

                </div>
                </>
    );
}

export default SingleCategory;