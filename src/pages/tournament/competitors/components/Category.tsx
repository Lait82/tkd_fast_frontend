import BeltIcon from "@/components/BeltIcon";
import RoleBadge from "@/components/forms/RoleBadge";
import { Rank, Role } from "@/types/enums";
import { categorySchema, CompetitorSchema } from "@/types/schemas";
import { buildCategoryName, getHighestRole, getRankName } from "@/utils/utils";
import { count } from "console";
import dayjs from "dayjs";
import { Edit } from "lucide-react";

interface CategoryProps {
	category: categorySchema;
	competitors: CompetitorSchema[];
}

const Category = ({ category, competitors }: CategoryProps) => {
	return (
		<div className="flex flex-col">
			<h2 className="font-semibold text-lg mb-1">
				<span className="text-orange font-black">{">"}</span>{" "}
				{buildCategoryName(category)}
			</h2>
			{competitors.length ? (
				competitors.map((competitor, i) => (
					<div
						key={`${i}-category`}
						className="grid grid-cols-4 justify-items-center items-center pl-3 font-bold"
					>
						{/* Fullname */}
						<div className="flex items-center justify-start w-full gap-1">
							<div className="rounded-full font-black items-center bg-background flex h-3 w-3 justify-center text-orange uppercase">
								{`${competitor.firstname.charAt(
									0
								)}${competitor.lastname.charAt(0)}`}
							</div>
							<div className="font-semibold capitalize">{`${competitor.firstname} ${competitor.lastname}`}</div>
						</div>

						{/* Rank */}
						<div className="flex items-center justify-start w-full ml-[50%] gap-1">
							<BeltIcon
								key={`${i}-belt`}
								rank={competitor.rank}
							/>
							{getRankName(competitor.rank) + " "}
						</div>

						{/* Age */}
						<div>
							{dayjs().diff(competitor.dob, "years").toString()}{" "}
							Años
						</div>

						{/* School */}
						<div>
							{competitor.school ?? (
								<i className="text-muted font-normal">
									No especifica
								</i>
							)}
						</div>
					</div>
				))
			) : (
				<div className="flex pl-3">
					{/* Fullname */}
					<div className="items-center flex justify-center">
						<i className="text-muted">
							Todavía no hay competidores anotados
						</i>
					</div>
				</div>
			)}
		</div>
	);
};

export default Category;
