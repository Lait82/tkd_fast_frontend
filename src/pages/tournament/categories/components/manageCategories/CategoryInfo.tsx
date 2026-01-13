import { useManageCategories } from "./ManageCategoryContext";
import { buildCategoryName } from "@/utils/utils";

const CategoryInfo = ({}) => {
    const { categories } = useManageCategories();
    return (
        <div className="">
            {categories.map((category, i) => (
                <div key={`category-item-${i}`} className="p-4 border-b last:border-0 hover:bg-background-500/50 transition-colors cursor-pointer">
                    <h2 className="font-bold text-xl">{buildCategoryName(category)}</h2>
                    <p className="text-muted">Edad: {category.min_age} - {category.max_age}</p>
                    <p className="text-muted">Peso: {category.min_weight} - {category.max_weight}</p>
                </div>
            ))}
        </div>
    );
}

export default CategoryInfo;