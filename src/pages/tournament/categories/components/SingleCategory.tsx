import BeltIcon from "@/components/BeltIcon";
import BoxingGloves from "@/components/icons/BoxingGloves";
import { CategorySchema } from "@/types/schemas/primitiveSchemas";
import { getDisciplineLabel, getGenderLabel, getIsTeamLabel, getRankName } from "@/utils/utils";
import { FaMedal } from "react-icons/fa";
import "../../../../styles/Categories.css"

interface SingleCategoryProps {
    category: CategorySchema;
}

const SingleCategory = ({category} : SingleCategoryProps) => {

    return (
        <div className="bg-super-elevated rounded-lg shadow-md overflow-hidden">
            <div className="grid grid-cols-[40fr_17fr_17fr_26fr]">
                {/* Description */}
                <div className={`flex flex-col col-span-1 pl-2.5 py-2 gap-1 ${(category.discipline).toString().toLowerCase()}`}>
                    {/* <h1 className="font-extrabold text-2xl bg-orange/20 p-1 w-fit rounded-4xl backdrop-blur-xs"> */}
                    <div className="relative inline-block">
                        <span className="text-2xl md:text-3xl font-bold">
                            {`${getGenderLabel(category.gender)} ${getDisciplineLabel(category.discipline)} ${getIsTeamLabel(category.is_team)}`}

                        </span>
                        <span className="absolute -bottom-1 left-0 w-full h-1 bg-linear-to-r from-red-500 via-orange-400 to-yellow-600 rounded-full"></span>
                    </div>

                        {/* {`${getGenderLabel(category.gender)} ${getDisciplineLabel(category.discipline)} ${getIsTeamLabel(category.is_team)}`} */}
                    {/* </h1> */}
                    <div className="flex h-full items-center">
                        <div className="grid grid-cols-[auto_1fr] ml-1 text-neutrallight p-1 rounded-3xl justify-around gap-y-1.5 gap-x-1">
                            {/* <span className="backdrop-blur-xs rounded-4xl bg-background-500/20">
                            </span> */}
                            <BoxingGloves/> 27 Competidores
                            {/* <span className="backdrop-blur-xs rounded-4xl bg-background-500/20">
                            </span> */}
                            <FaMedal className="ml-[0.4rem]"/> 3er Puesto definido por lucha
                        </div>

                    </div>
                </div>

                {/* Age */}
                <div className="flex flex-col col-span-1 gap-0.5 justify-start py-2">
                    Edad:
                    <div className="flex flex-col ml-1 text-muted justify-around gap-1.5">
                        <div className="flex min-w-fit max-w-[5rem] justify-between">
                            Desde: 
                            <span className="text-neutrallight">{category.min_age}</span>
                        </div>
                        <div className="flex min-w-fit max-w-[5rem] justify-between">
                            Hasta:
                            <span className="text-neutrallight">{category.max_age}</span>
                        </div>
                    </div>
                </div>

                {/* Weight */}
                <div className="flex flex-col col-span-1 gap-0.5 justify-start py-2">
                    Peso:
                    <div className="flex flex-col ml-1 text-muted justify-around gap-1.5">
                        <div className="flex min-w-fit max-w-[5rem] justify-between">
                            Desde: 
                            <span className="text-neutrallight">{category.min_weight}</span>
                        </div>
                        <div className="flex min-w-fit max-w-[5rem] justify-between">
                            Hasta:
                            <span className="text-neutrallight">{category.max_weight}</span>
                        </div>
                    </div>
                </div>

                {/* Rank */}
                <div className="flex flex-col col-span-1 gap-0.5 justify-start pr-2.5 py-2">
                    Categoria:
                    <div className="flex flex-col ml-1 text-muted justify-around gap-0.5">
                        <div className="flex items-center gap-1 min-w-fit max-w-[5rem] justify-between">
                            Desde: 
                            <BeltIcon rank={category.min_rank} />
                            <span className="text-neutrallight">{getRankName(category.min_rank)}</span>
                        </div>
                        <div className="flex items-center gap-1 min-w-fit max-w-[5rem] justify-between">
                            Hasta:
                            <BeltIcon rank={category.max_rank} />
                            <span className="text-neutrallight">{getRankName(category.max_rank)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SingleCategory;