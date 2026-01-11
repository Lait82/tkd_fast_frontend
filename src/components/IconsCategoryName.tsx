import BeltIcon from "@/components/BeltIcon";
import { Discipline, Gender } from "@/types/enums";
import { CategorySchema } from "@/types/schemas/primitiveSchemas";
import { getRankName } from "@/utils/utils";

const IconsCategoryName = ({
	category,
	className = "",
	hideArrow = false,
	showGenderColor = false,
}: {
	category: CategorySchema;
	className?: string;
	hideArrow?: boolean;
	showGenderColor?: boolean;
}) => {
	const discipline = {
		[Discipline.COMBAT]: "Lucha",
		[Discipline.PATTERNS]: "Formas",
		[Discipline.TBD]: "Por Definir",
	};
	const gender = {
		[Gender.FEMALE]: "Femenino",
		[Gender.MALE]: "Masculino",
	};
	const teamOrIndividual = category.is_team ? "Equipos" : "Individual";
	const genderColor = {
		[Gender.FEMALE]: "text-[#E16A8D]",
		[Gender.MALE]: "text-blue",
	};
	return (
		<span className={`flex items-center gap-0.5 ${className}`}>
			{!hideArrow && <span className="text-orange font-black">{"> "}</span>}
			{`${discipline[category.discipline]} ${teamOrIndividual}`}
			{showGenderColor 
				? <span className={genderColor[category.gender]}>{` | `}</span>
				: " | "}
			{` ${gender[category.gender]}`}
			{showGenderColor 
				? <span className={genderColor[category.gender]}>{` | `}</span>
				: " | "}
			<BeltIcon size={15} rank={category.min_rank} />
			{` ${getRankName(category.min_rank)} - `}
			<BeltIcon size={15} rank={category.max_rank} />
			{` ${getRankName(category.max_rank)}`}
			{showGenderColor 
				? <span className={genderColor[category.gender]}>{` | `}</span>
				: " | "}
			{`${category.min_weight} Kg - ${category.max_weight} Kg`}
		</span>
	);
};

export default IconsCategoryName;
