import { useManageCompetitors } from "../ManageCompetitorContext";
import { Edit, Trash2 } from "lucide-react";
import Button from "@/components/Button";
import { Fragment, useState } from "react";
import {
	Dialog,
	DialogPanel,
	DialogTitle,
	Transition,
	TransitionChild,
} from "@headlessui/react";
import Tooltip from "@/components/Tooltip";
import Members from "./components/Members";

const EditTeam = ({}) => {
	const { teamDraft } = useManageCompetitors();
	const [isOpen, setIsOpen] = useState(false);
	function closeModal() {
		setIsOpen(false);
	}

	function openModal() {
		setIsOpen(true);
	}

	return (
		<>
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
										Eliminar Inscripción
									</DialogTitle>
									<div className="mt-1">
										<p className="text-md text-muted text-center">
											{`¿Estas seguro que quieres eliminar
											el siguiente equipo?: `}
											<br />
											<br />
											<span className="text-orange font-black">
												{"> "}
											</span>
											<span className="text-neutrallight capitalize italic">
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
												// handleButtonClick();
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
			<div className="bg-elevated flex flex-col gap-2 shadow-lg justify-center p-3 rounded-lg">
				<div className="flex flex-col gap-3">
					<div className="flex w-full justify-between items-center">
						<h1 className="font-extrabold text-2xl">
							Editar equipo
						</h1>
						<div className="flex items-center gap-1.5">
							<Tooltip text="Editar">
								<Edit className="transition-all cursor-pointer hover:text-orange" />
							</Tooltip>
							<Tooltip text="Eliminar equipo">
								<Trash2
									size={30}
									className="transition-all ease-fluid fill-transparent stroke-red hover:transition-all hover:ease-fluid hover:fill-red cursor-pointer"
									onClick={openModal}
								/>
							</Tooltip>
						</div>
					</div>
					<div className="flex gap-2">
						<div
							className="flex-shrink-0 flex rounded-full justify-center uppercase items-center bg-background text-orange text-5xl"
							style={{
								height: "130px",
								width: "130px",
							}}
						>
							{`${teamDraft.name
								.split(" ")
								.slice(0, 3)
								.map((word) => word.charAt(0))
								.join("")}`}
						</div>
						<div className="grid grid-cols-2 gap-2 flex-1 items-center">
							<div className="flex items-center gap-1">
								<span className="text-muted">Nombre</span>
								{teamDraft.name}
							</div>
						</div>
					</div>
					<Members />
				</div>
			</div>
		</>
	);
};

export default EditTeam;
