import { CategorySchema } from "@/types/schemas/primitiveSchemas";
import { buildCategoryName } from "@/utils/utils";

interface SingleCategoryProps {
    category: CategorySchema;
}

const SingleCategory = ({category} : SingleCategoryProps) => {

    return (
        <div>{buildCategoryName(category)}</div>

    );
}

export default SingleCategory;