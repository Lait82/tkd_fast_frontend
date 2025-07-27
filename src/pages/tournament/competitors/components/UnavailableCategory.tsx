import { CategorySchema } from "@/types/schemas/primitiveSchemas";
import IconsCategoryName from "@/components/IconsCategoryName";
import { FaUsers } from "react-icons/fa";
import { RiBoxingFill } from "react-icons/ri";
// import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";

const UnavailableCategory = ({ category }: { category: CategorySchema }) => {
    return (
        <div
            className={`flex grayscale-75 items-center w-full px-1 py-1.5 font-bold justify-between
                                    border-transparent rounded-lg relative`}
        >
            <IconsCategoryName
                className="text-muted cursor-not-allowed"
                category={category}
            />
            {category.is_team ? (
                <FaUsers
                    size={30}
                    className="transition-all text-muted focus:ring-0 cursor-not-allowed"
                />
            ) : (
                <RiBoxingFill
                    size={30}
                    className="transition-all text-muted cursor-not-allowed"
                />
            )}
        </div>
    );
};

export default UnavailableCategory;
