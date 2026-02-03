import { getGenderLabel, getRankName } from "@/utils/utils";
import { useManageCategories } from "./ManageCategoryContext";
import { Gender, ManageModes} from "@/types/enums";
import { TbGenderFemale, TbGenderMale } from "react-icons/tb";
import Button from "@/components/Button";
import BeltIcon from "@/components/icons/BeltIcon";
import DisciplineBadge from "@/components/DisciplineBadge";
import Slider from "@/components/Slider";
import { Edit, Trash2 } from "lucide-react";
import { FaEye } from "react-icons/fa";


const CategoryInfo = ({}) => {
    const { selectedCategory, setManageMode } = useManageCategories();
    // SelectedCategory esta shortcircuiting para que no joda el linter
    return (selectedCategory && <>
        <div className="flex flex-col gap-2">
            <h1 className="flex gap-1 font-extrabold text-2xl"><FaEye />Información de la categoría</h1>
            
            <h3 className="font-bold text-lg">Género</h3>
            <div className={`flex w-full gap-2 p-0 px-2 justify-between font-semibold`} >  
                <div className={`group w-full flex items-center justify-center rounded-lg p-1.5 ${selectedCategory.gender === Gender.MALE ? "bg-super-elevated" : ""}`}>
                    <TbGenderMale className={`size-3 transition ${selectedCategory.gender === Gender.MALE ? "text-orange" : "text-muted"}`} />
                    <span>{getGenderLabel(Gender.MALE)}</span>
                </div>
                <div className={`group w-full flex items-center justify-center rounded-lg p-1.5 ${selectedCategory.gender === Gender.FEMALE ? "bg-super-elevated" : ""}`}>
                    <TbGenderFemale className={`size-3 transition ${selectedCategory.gender === Gender.FEMALE ? "text-orange" : "text-muted"}`} />
                    <span>{getGenderLabel(Gender.FEMALE)}</span>
                </div>
            </div>
            <div className="flex flex-col">
                <h3 className="font-bold text-lg">Disciplina</h3>
                <div className="flex gap-1 p-1 pb-0 justify-center">
                    <DisciplineBadge discipline={selectedCategory.discipline} isTeam={selectedCategory.is_team} />
                </div>
            </div>
            <div className="flex flex-col gap-1">
                <h3 className="font-bold text-lg">Edad</h3>
                <Slider 
                    min={0} 
                    max={90}
                    value={[selectedCategory.min_age, selectedCategory.max_age]}
                    disabled={true}
                    withValueLabels
                />
            </div>
            <div className="flex flex-col gap-1">
                <h3 className="font-bold text-lg">Peso</h3>
                
                <Slider 
                    min={40} 
                    max={130}
                    value={[selectedCategory.min_weight, selectedCategory.max_weight]}
                    disabled={true}
                />
                <div className="flex gap-1 p-1">
                    <div className="flex items-center text-muted gap-1">
                        Desde <span className="text-neutrallight font-bold text-xl">{selectedCategory.min_weight.toFixed(1)}</span>
                    </div>
                    <div className="flex items-center text-muted gap-1">
                        hasta <span className="text-neutrallight font-bold text-xl">{selectedCategory.max_weight.toFixed(1)}</span> Kgs
                    </div>
                </div>
            </div>
        </div>
        <div className="flex flex-col">
            <h3 className="font-bold text-lg">Graduacion</h3>
            <div className="flex gap-2 justify-between p-2">
                <span className="flex flex-col text-muted w-full gap-1">
                    Desde
                    {selectedCategory.min_rank && (<span className="flex flex-col items-center text-neutrallight gap-1 w-full justify-center px-2 py-1 rounded-lg bg-super-elevated">
                        <BeltIcon rank={selectedCategory.min_rank} />
                        {getRankName(selectedCategory.min_rank)}
                    </span>)}
                </span>
                <span className="flex flex-col text-muted w-full gap-1">
                    Hasta
                    {selectedCategory.max_rank && (<span className="flex flex-col items-center text-neutrallight gap-1 w-full justify-center px-2 py-1 rounded-lg bg-super-elevated">
                        <BeltIcon rank={selectedCategory.max_rank} />
                        {getRankName(selectedCategory.max_rank)}
                    </span>)}
                </span>
            </div>
        </div>
        <div className="grid grid-cols-2 justify-between gap-2 items-end">
            <Button variant="secondary" type="submit" iconLeft={<Trash2 className="transition-all ease-fluid fill-transparent stroke-red-700 hover:ease-fluid group-hover:fill-red-700 cursor-pointer" />} >
                Eliminar
            </Button>
            <Button type="button" iconLeft={<Edit className="transition-all" onClick={()=>{
                setManageMode(ManageModes.EDIT);
            }} />} >
                Editar
            </Button>
        </div>        
    </>);
}

export default CategoryInfo;