import BeltIcon from "@/components/BeltIcon";
import { getRankName } from "@/utils/utils";
import dayjs from "dayjs";
import { useManageCompetitors } from "./ManageCompetitorContext";
import { ChevronDown, Users, X } from "lucide-react";
import {
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
	Transition,
} from "@headlessui/react";
import BoxingGloves from "@/components/icons/BoxingGloves";

const EditCompetitor = ({}) => {
	const { competitorDraft, userCompetitors, manageType } =
		useManageCompetitors();
	return (
		<div className="bg-elevated flex flex-col gap-2 shadow-lg justify-center p-3 rounded-lg">
			<div className="flex flex-col gap-3">
				<h1 className="font-extrabold text-2xl">
					Información Personal
				</h1>
				<div className="flex gap-2">
					<div
						className="flex-shrink-0 flex rounded-full justify-center items-center bg-background text-orange text-5xl"
						style={{
							height: "130px",
							width: "130px",
						}}
					>
						{`${competitorDraft.user.firstname
							.charAt(0)
							.toUpperCase()}${competitorDraft.user.lastname
							.charAt(0)
							.toUpperCase()}`}
					</div>
					<div className="grid grid-cols-2 gap-2 flex-1 items-center">
						<div className="flex items-center gap-1">
							<span className="text-muted">Nombre</span>
							{competitorDraft.user.firstname}
						</div>
						<div className="flex items-center gap-1">
							<span className="text-muted">Graduación</span>
							<BeltIcon rank={competitorDraft.user.rank} />
							{getRankName(competitorDraft.user.rank)}
						</div>
						<div className="flex items-center gap-1">
							<span className="text-muted">
								Fecha de Nacimiento
							</span>
							{dayjs(competitorDraft.user.dob)
								.locale("es")
								.format("D MMMM YYYY")}
						</div>
						<div className="flex items-center gap-1">
							<span className="text-muted">DNI</span>
							{competitorDraft.user.id_number}
						</div>
					</div>
				</div>

				<div className="flex gap-1">
					<Users size={32} />
					<h1 className="font-extrabold text-2xl">Equipos</h1>
				</div>

				{competitorDraft.teams.map((competitorTeam) => {
					return (
						<div className="w-full rounded-lg">
							<Disclosure>
								{({ open }) => (
									<>
										<DisclosureButton
											className={`flex transition-all ease-fluid justify-between hover:cursor-pointer w-full px-2 py-1 font-medium 
                                            focus:outline-none 
                                            border 
                                            ${
												open
													? "border-orange rounded-t-lg border-b-transparent hover:border-b-transparent"
													: "border-transparent rounded-lg hover:border-orange"
											} `}
										>
											<span className="flex items-center gap-1 text-xl">
												<BoxingGloves size={24} />{" "}
												{competitorTeam.name}
											</span>
											<ChevronDown
												className={`w-2 h-2 transition-transform duration-200 ${
													open ? "rotate-180" : ""
												}`}
											/>
										</DisclosureButton>
										<Transition
											show={open}
											enter="transition duration-300 ease-out"
											enterFrom="transform scale-y-0 opacity-0 origin-top"
											enterTo="transform scale-y-100 opacity-100 origin-top"
											leave="transition duration-200 ease-in"
											leaveFrom="transform scale-y-100 opacity-100 origin-top"
											leaveTo="transform scale-y-0 opacity-0 origin-top"
										>
											<DisclosurePanel className="">
												<ul
													className={`space-y-1 transition-all ease-fluid border
                                                ${
													open
														? "rounded-b-lg border-orange border-t-transparent"
														: "border-transparent"
												}
                                                border border-orange`}
												>
													{
														userCompetitors
															.filter(
																(competitor) =>
																	competitor.teams.some(
																		(
																			team
																		) =>
																			team.uuid ===
																			competitorTeam.uuid
																	)
															)
															.map((comp) => (
																<div
																	key={crypto.randomUUID()}
																	className={`grid grid-cols-[1fr_1fr_1fr_auto] px-3 py-0.5 justify-items-center items-center font-bold`}
																>
																	{/* Fullname */}
																	<div className="flex items-center justify-start w-full gap-1">
																		<div className="rounded-full font-black items-center bg-background flex h-3 w-3 justify-center text-orange uppercase">
																			{`${comp.user.firstname.charAt(
																				0
																			)}${comp.user.lastname.charAt(
																				0
																			)}`}
																		</div>
																		<div className="font-semibold capitalize">{`${comp.user.firstname} ${comp.user.lastname}`}</div>
																	</div>

																	{/* Rank */}
																	<div className="flex items-center justify-center w-full gap-1">
																		<BeltIcon
																			key={crypto.randomUUID()}
																			rank={
																				comp
																					.user
																					.rank
																			}
																		/>
																	</div>

																	{/* Age */}
																	<div>
																		{dayjs()
																			.diff(
																				comp
																					.user
																					.dob,
																				"years"
																			)
																			.toString()}{" "}
																		Años
																	</div>

																	<div className="flex w-full justify-end items-center">
																		<X
																			size={
																				32
																			}
																			className="text-red"
																		/>
																	</div>
																</div>
															))

														// members.map((member) => (
														// 	<li
														// 		key={member.id}
														// 		className="pl-2 border-l-2 border-purple-400"
														// 	>
														// 		{member.name}
														// 	</li>
														// ))}
													}
												</ul>
											</DisclosurePanel>
										</Transition>
									</>
								)}
							</Disclosure>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default EditCompetitor;
