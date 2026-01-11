import BoxingGloves from "@/components/icons/BoxingGloves";
import ParoJunbi from "@/components/icons/ParoJunbi";
import ParoJunbiGroup from "@/components/icons/ParoJunbiGroup";
import IconsCategoryName from "@/components/IconsCategoryName";
import { Discipline, Gender } from "@/types/enums";
import { CategorySchema } from "@/types/schemas/primitiveSchemas";
import { buildCategoryName} from "@/utils/utils";
import { X } from "lucide-react";
import { RiBoxingFill } from "react-icons/ri";

interface CategoryRowProps {
    category: CategorySchema;
}

const CategoryRow = ({category} : CategoryRowProps) => {
    // const iconMap = {
    //     [Discipline.PATTERNS]: {
    //         true: <ParoJunbiGroup color="blue"/>,
    //         false: <ParoJunbi color="blue"/>,
    //     },
    //     [Discipline.COMBAT]: <ParoJunbiGroup color="red"/>,
    //     [Discipline.TBD]: <X />,
    // }
    // const genderColor = {
    //     [Gender.FEMALE]: "text-[#E16A8D]",
    //     [Gender.MALE]: "text-blue",
    // };
    const genderColor = {
        [Gender.FEMALE]: "border-l-[#AD1F50]",
        [Gender.MALE]: "border-l-[#1F58AD]",
    };
    const tsf = {
        [Gender.FEMALE]: "border-l-4 border-l-[#AD1F50]",
        [Gender.MALE]: "border-l-4 border-l-[#1F58AD]",
    };
    //     const tsf = {
    //     [Gender.FEMALE]: "",
    //     [Gender.MALE]: "",
    // };
    const getCategoryIcon = (discipline: Discipline, isTeam: boolean) => {
        if (discipline === Discipline.PATTERNS) {
            return isTeam 
            ? <ParoJunbiGroup className={genderColor[category.gender]} /> 
            : <ParoJunbi className={genderColor[category.gender]} />;
        } else if (discipline === Discipline.COMBAT) {
            return isTeam 
            ? <BoxingGloves className={genderColor[category.gender]} />
            : <RiBoxingFill className={genderColor[category.gender]} size={32} /> 
        } else {
            return <X />;
        }
    }
    return (
        <div className={`bg-super-elevated border-b-muted last:border-b-0 shadow-md overflow-hidden ${tsf[category.gender]}`}>
            <div className="flex">
                {/* Description */}
                <div className="flex w-full p-1 border-b items-center last:border-0 hover:bg-elevated transition-colors cursor-pointer" key={`category-item-${category.uuid}`}>
                    {getCategoryIcon(category.discipline, category.is_team)}
                    <h2 className="font-bold text-xl ml-1"><IconsCategoryName category={category} hideArrow /></h2>
                </div>
            </div>
        </div>
    );
}

export default CategoryRow;