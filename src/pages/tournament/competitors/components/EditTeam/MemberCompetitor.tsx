import {
	Dialog,
	DialogPanel,
	DialogTitle,
	Field,
	Label,
	Transition,
	TransitionChild,
} from "@headlessui/react";
import { CompetitorSchema } from "@/types/schemas/primitiveSchemas";
import BeltIcon from "@/components/BeltIcon";
import { getRankName } from "@/utils/utils";
import dayjs from "dayjs";
import { UserMinus } from "lucide-react";
import { Fragment, useState } from "react";
import Button from "@/components/Button";
import { errorToast, successToast } from "@/services/toasts";
import { kickCompetitor } from "@/services/teamService";
import { useManageCompetitors } from "../ManageCompetitorContext";
import { kickCompetitorResponseSchema } from "@/types/schemas/teamServiceSchemas";

interface MemberCompetitorProps {
	competitor: CompetitorSchema;
}

const MemberCompetitor = ({ competitor }: MemberCompetitorProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const { teamDraft, updateCompetitorsList, updateTeamsList } =
		useManageCompetitors();

	function closeModal() {
		setIsOpen(false);
	}

	function openModal() {
		setIsOpen(true);
	}

	const handleButtonClick = async () => {
		try {
			const res = await kickCompetitor(teamDraft.uuid, competitor.uuid);
			const kickCompetitorRes = kickCompetitorResponseSchema.parse(res);

			updateCompetitorsList(kickCompetitorRes.competitor);
			updateTeamsList(kickCompetitorRes.team);

			successToast(
				"El competidor ha sido expulsado exitosamente del equipo."
			);
		} catch (error: any) {
			errorToast(
				error.message ||
					"Ha ocurrido un error al expulsar el competidor."
			);
		}

		closeModal();
	};
	return (
		<Field>
			<Transition appear show={isOpen} as={Fragment}>
				<Dialog as="div" className="relative z-10" onClose={closeModal}>
					<TransitionChild
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black/25" />
					</TransitionChild>

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center p-4 text-center">
							<TransitionChild
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-super-elevated p-4 text-left align-middle shadow-xl transition-all">
									<DialogTitle
										as="h3"
										className="text-2xl gap-1 font-extrabold text-neutrallight flex w-full justify-center"
									>
										Expulsar Miembro
									</DialogTitle>
									<div className="mt-1">
										<p className="text-md text-muted text-center">
											{`¿Estas seguro que quieres expulsar
											a `}
											<span className="text- neutrallight capitalize italic">{`${competitor.user.firstname} ${competitor.user.lastname} `}</span>
											del siguiente equipo?
											<br />
											<br />
											<span className="text-orange font-black">
												{"> "}
											</span>
											<span className="text-neutrallight capitalize">
												{teamDraft.name}
											</span>
										</p>
									</div>

									<div className="flex mt-1.5 gap-2 justify-between">
										<Button
											variant="secondary"
											onClick={(e) => {
												e.preventDefault();
												closeModal();
											}}
										>
											Cerrar
										</Button>
										<Button
											variant="primary"
											onClick={(e) => {
												e.preventDefault();
												handleButtonClick();
												closeModal();
											}}
										>
											Estoy seguro
										</Button>
									</div>
								</DialogPanel>
							</TransitionChild>
						</div>
					</div>
				</Dialog>
			</Transition>
			<Label
				className={`grid grid-cols-3 px-1 py-0.5 rounded-lg transition-all ease-fluid justify-items-center items-center font-bold`}
			>
				{/* Fullname */}
				<div className="flex items-center justify-start w-full gap-1">
					<div className="rounded-full font-black items-center bg-background flex h-3 w-3 justify-center text-orange uppercase">
						{`${competitor.user.firstname.charAt(
							0
						)}${competitor.user.lastname.charAt(0)}`}
					</div>
					<div className="font-semibold capitalize">{`${competitor.user.firstname} ${competitor.user.lastname}`}</div>
				</div>

				{/* Rank */}
				<div className="flex items-center justify-start pl-[20%] w-full gap-1">
					<BeltIcon
						className="flex-shrink-0"
						// key={`${i}-belt`}
						rank={competitor.user.rank}
					/>
					<div className="flex-grow">
						{getRankName(competitor.user.rank)}
					</div>
				</div>

				{/* Age and form item*/}
				<div className="flex gap-1 w-full items-center">
					<div className="flex w-full justify-center">
						{dayjs().diff(competitor.user.dob, "years").toString()}{" "}
						Años
					</div>
					<UserMinus
						onClick={openModal}
						size={30}
						className="transition-all ease-fluid fill-transparent stroke-red hover:transition-all hover:ease-fluid hover:fill-red cursor-pointer"
					/>
				</div>
			</Label>
		</Field>
	);
};

export default MemberCompetitor;
