import { Listbox } from "@headlessui/react";
import BeltIcon from "./BeltIcon";
import { Rank } from "@/types/enums";
import { getRankName } from "@/utils/utils";

// interface RankOption {
// 	value: Rank;
// }
const rankOptions: Rank[] = Object.values(Rank);
//[
// { value: Rank.WHITE },
// { value: Rank.WHITE_YELLOW },
// { value: Rank.YELLOW },
// { value: Rank.YELLOW_GREEN },
// { value: Rank.GREEN },
// { value: Rank.GREEN_BLUE },
// { value: Rank.BLUE },
// { value: Rank.BLUE_RED },
// { value: Rank.RED },
// { value: Rank.RED_BLACK },
// { value: Rank.DAN_1 },
// { value: Rank.DAN_2 },
// { value: Rank.DAN_3 },
// { value: Rank.DAN_4 },
// { value: Rank.DAN_5 },
// { value: Rank.DAN_6 },

// ];

const RankSelect = ({
	value,
	onChange,
	loading,
}: {
	value: Rank;
	onChange: (e: Rank) => void;
	loading?: boolean;
}) => {
	return (
		<div className="form-group">
			<Listbox value={value} onChange={onChange} disabled={loading}>
				<Listbox.Label className="form-label">Grado</Listbox.Label>

				<div className="relative mt-1">
					<Listbox.Button className="form-input-primary pl-10 text-left w-full">
						{/* Selected value display */}
						<div className="flex items-center gap-2">
							<span className="absolute left-2 top-1/2 -translate-y-1/2">
								<BeltIcon rank={value} size={20} />
							</span>
							<span className="pl-6">{getRankName(value)}</span>
						</div>
					</Listbox.Button>

					{/* Dropdown options */}
					<Listbox.Options className="absolute w-full py-1 mt-1 max-h-60 overflow-auto rounded-md bg-white shadow-lg border border-gray-200 z-10">
						{rankOptions.map((rank) => (
							<Listbox.Option
								key={rank}
								value={rank}
								className={({ active }) =>
									`relative cursor-default select-none py-2 pl-10 pr-4 ${
										active ? "bg-gray-100" : ""
									}`
								}
							>
								{({ selected }) => (
									<div className="flex items-center gap-2">
										<span className="absolute left-2">
											<BeltIcon
												rank={rank}
												size={20}
												className={
													selected
														? "opacity-100"
														: "opacity-50"
												}
											/>
										</span>
										<span
											className={`block ${
												selected
													? "font-medium"
													: "font-normal"
											}`}
										>
											{getRankName(rank)}
										</span>
									</div>
								)}
							</Listbox.Option>
						))}
					</Listbox.Options>
				</div>
			</Listbox>
		</div>
	);
};

export default RankSelect;
