import { getGenderLabel } from "@/utils/utils";
import { useManageCategories } from "./ManageCategoryContext";
import { Gender } from "@/types/enums";
import { Radio, RadioGroup } from "@headlessui/react";
import { useState } from "react";
import { TbGenderFemale, TbGenderMale } from "react-icons/tb";

const CategoryInfo = ({}) => {
    const { selectedCategory } = useManageCategories();
    const [selected, setSelected] = useState<Gender>(Gender.MALE)
    return (
        <div className={`flex flex-col ${selectedCategory ? "col-span-2" : "col-span-0"} gap-3 bg-elevated p-3 rounded-lg shadow-md`}>

			<div className="flex flex-col gap-3">
				<h1 className="font-extrabold text-2xl">Administrar categoria</h1>
                
                <form>
                    <h3 className="font-semibold text-lg">Género</h3>
                    <RadioGroup className={`flex w-full justify-around`} name="gender" value={selected} onChange={setSelected}>  
                        <Radio
                            value={Gender.MALE}
                            className="group flex items-center cursor-pointer rounded-lg p-1.5 transition focus:not-data-focus:outline-none data-checked:bg-super-elevated data-focus:outline data-focus:outline-orange-900"
                            >
                            <TbGenderMale className="size-3 transition group-data-checked:text-orange" />
                            <span>{getGenderLabel(Gender.MALE)}</span>
                        </Radio>
                        <Radio
                            value={Gender.FEMALE}
                            className="group flex items-center cursor-pointer rounded-lg p-1.5 transition focus:not-data-focus:outline-none data-checked:bg-super-elevated data-focus:outline data-focus:outline-orange-900"
                        >
                            <TbGenderFemale className="size-3 transition group-data-checked:text-orange" />
                            <span>{getGenderLabel(Gender.FEMALE)}</span>
                        </Radio>
                    </RadioGroup>

                    {/* <h3 className="font-semibold text-lg">Modalidad</h3> */}
                    {/* Adaptar el select de cinturones para hacerlo componente reusable.*/}
                </form>
            </div>
        </div>
    );
}

export default CategoryInfo;