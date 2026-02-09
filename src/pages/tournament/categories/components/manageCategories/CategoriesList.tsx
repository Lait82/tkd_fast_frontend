import { BiCategory } from "react-icons/bi";
import { useManageCategories } from "./ManageCategoryContext";
import CategoryRow from "./categoriesList/CategoryRow";
import { ManageModes } from "@/types/enums";

const CategoriesList = ({}) => {
    const { categories, setManageMode, manageMode, setSelectedCategory } = useManageCategories();
    return (
        <>
            <h1 className="font-extrabold text-2xl">Lista de Categorias</h1>
            <div className="flex flex-col gap-2">
                {categories.length 
                    ? categories.map((category, i) => (
                        <CategoryRow category={category} key={`single-category-${i}`} />
                    ))

                    : <span className="p-1.5 flex items-center italic"> No existen categorias creadas para este torneo todavia...</span>
                }
                <div className="flex items-center cursor-pointer justify-start w-full gap-1 capitalize text-muted italic transition-all hover:border-orange border border-transparent rounded-lg p-1"
                    onClick={()=>{
                        console.log(manageMode)
                        setSelectedCategory(null)
                        setManageMode(ManageModes.CREATE)
                    }}
                >
                    <BiCategory size={28}/>
                    Agregar nueva categoria
                </div>
            </div>
        </>
    );
}

export default CategoriesList; DESPUES DE CREAR UNA CATEGORIA EL FORM NO CAMBIA, SE QUEDA EN EDIT Y SI CLICKEAS RAPIDO EN CREAR CATEGORIA SE QUEDA EL FORM DE EDIT PORQUE PATTERNS NO LLEVA PESO.