import BoxingGloves from "@/components/icons/BoxingGloves";
import ParoJunbi from "@/components/icons/ParoJunbi";
import ParoJunbiGroup from "@/components/icons/ParoJunbiGroup";
import IconsCategoryName from "@/components/IconsCategoryName";
import Tooltip from "@/components/Tooltip";
import { Discipline, Gender, ManageModes } from "@/types/enums";
import { CategorySchema } from "@/types/schemas/primitiveSchemas";
// import { buildCategoryName} from "@/utils/utils";
import { Edit, Pause, Trash2, X } from "lucide-react";
import { RiBoxingFill } from "react-icons/ri";
import { useManageCategories } from "../ManageCategoryContext";
import { useEffect, useState } from "react";
import { CategoryModalTypes } from "../../../types";

interface CategoryRowProps {
    category: CategorySchema;
}

const CategoryRow = ({category} : CategoryRowProps) => {
    const { selectedCategory, setSelectedCategory, setManageMode, openModal } = useManageCategories();

    const genderColor = {
        [Gender.FEMALE]: "text-[#AD1F50]",
        [Gender.MALE]: "text-[#1F58AD]",
    };
    const [isSelected, setIsSelected] = useState<boolean>(true);
    useEffect(() => {
        setIsSelected(selectedCategory?.uuid === category.uuid);
    }, [selectedCategory]);

    const getCategoryIcon = (discipline: Discipline, isTeam: boolean) => {
        if (discipline === Discipline.PATTERNS) {
            return isTeam 
            ? <ParoJunbiGroup /> 
            : <ParoJunbi />;
        } else if (discipline === Discipline.COMBAT) {
            return isTeam 
            ? <BoxingGloves />
            : <RiBoxingFill size={32} /> 
        } else {
            return <X />;
        }
    }
    return (
        // <div className={` border-b-muted last:border-b-0 overflow-hidden ${tsf[category.gender]}`}>
        <div className={` border-b-muted last:border-b-0 overflow-hidden`}
        onClick={()=> {
            if(!isSelected){setSelectedCategory(category);}
            setManageMode(ManageModes.VIEW)
            }}>
            {/* Description */}
            <div className={`flex rounded-md \
                border ${isSelected ? "border-orange" : "border-transparent"} \
                p-1 items-center justify-between hover:border-orange transition-colors cursor-pointer`} key={`category-item-${category.uuid}`}>
                <div className="flex">
                    {getCategoryIcon(category.discipline, category.is_team)}
                    <h2 className="font-bold text-xl ml-1"><IconsCategoryName category={category} arrowClass={genderColor[category.gender]} /></h2>
                </div>
                <div className="flex">
                    <Tooltip text="Editar">
                        <div className="group flex transition-all p-1 rounded-full hover:bg-orange-700/10"
                            onClick={(e)=>{
                                e.stopPropagation()
                                setSelectedCategory(category)
                                setManageMode(ManageModes.EDIT)
                            }}
                        >
                            <Edit className="transition-all ease-fluid stroke-muted fill-transparent hover:ease-fluid cursor-pointer" />
                        </div>
                    </Tooltip>
                    <Tooltip text="Pausar inscripciones">
                        <div className="group flex transition-all p-1 rounded-full hover:bg-muted/10">
                        <Pause className="transition-all ease-fluid fill-transparent stroke-muted hover:ease-fluid group-hover:fill-muted cursor-pointer" />
                    </div>
                    </Tooltip>
                    <Tooltip text="Eliminar categoría">
                        <div
                             onClick={(e)=>{
                                // e.stopPropagation()
                                openModal(CategoryModalTypes.DELETE)
                            }}
                            className="group flex transition-all p-1 rounded-full hover:bg-red-700/10">
                            <Trash2 className="transition-all ease-fluid fill-transparent stroke-red-700 hover:ease-fluid group-hover:fill-red-700 cursor-pointer" />
                        </div>
                    </Tooltip>
                </div>
            </div>
        </div>
    );
}

export default CategoryRow;