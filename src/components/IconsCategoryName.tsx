import BeltIcon from "@/components/icons/BeltIcon";
import { Discipline, Gender } from "@/types/enums";
import { CategorySchema } from "@/types/schemas/primitiveSchemas";
import { getRankName } from "@/utils/utils";

const IconsCategoryName = ({
	category,
	className = "",
	hideArrow = false,
	arrowClass= "text-orange",
}: {
	category: CategorySchema;
	className?: string;
	hideArrow?: boolean;
	arrowClass?: string;
}) => {
	const discipline = {
		[Discipline.COMBAT]: "Lucha",
		[Discipline.PATTERNS]: "Formas",
	};
	const gender = {
		[Gender.FEMALE]: "Femenino",
		[Gender.MALE]: "Masculino",
	};
	const teamOrIndividual = category.is_team ? "Equipos" : "Individual";
	return (
		<span className={`flex items-center gap-0.5 ${className}`}>
			{!hideArrow && <span className={arrowClass}>{"> "}</span>}
			{`${discipline[category.discipline]} ${teamOrIndividual}`}
			{` | `}
			{` ${gender[category.gender]}`}
			{` | `}
			<BeltIcon size={15} rank={category.min_rank} />
			{` ${getRankName(category.min_rank)} - `}
			<BeltIcon size={15} rank={category.max_rank} />
			{` ${getRankName(category.max_rank)}`}
			{` | `}
			{`${category.min_weight} Kg - ${category.max_weight} Kg`}
		</span>
	);
};

export default IconsCategoryName;
