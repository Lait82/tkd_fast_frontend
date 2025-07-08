import { CategorySchema } from "@/types/schemas/primitiveSchemas";
import { Fragment, useState } from "react";
import { useManageCompetitors } from "./ManageCompetitorContext";
import { removeEnrollmentToCategory } from "@/services/competitorService";
import { errorToast, successToast } from "@/services/toasts";
import {
	Dialog,
	DialogPanel,
	DialogTitle,
	Transition,
	TransitionChild,
} from "@headlessui/react";
import Button from "@/components/Button";
import IconsCategoryName from "@/components/IconsCategoryName";
import { Trash2 } from "lucide-react";

const EnrolledCategory = ({ category }: { category: CategorySchema }) => {
	let [isOpen, setIsOpen] = useState(false);
	const { competitorDraft, setCompetitorDraft } = useManageCompetitors();
	const inscription = competitorDraft.inscriptions.find(
		(inscription) => inscription.category_uuid === category.uuid
	);

	function closeModal() {
		setIsOpen(false);
	}

	function openModal() {
		setIsOpen(true);
	}

	const handleButtonClick = async () => {
		try {
			const inscriptionUuid = inscription?.uuid;
			if (!inscriptionUuid) return;

			await removeEnrollmentToCategory(inscriptionUuid);

			// Remove de la inscripcion eliminada.
			setCompetitorDraft({
				...competitorDraft,
				inscriptions: competitorDraft.inscriptions.filter(
					(inscription) => inscription.uuid !== inscriptionUuid
				),
			});
			successToast("Inscripción eliminada correctamente.");
		} catch (error) {
			errorToast(
				"Ha ocurrido un error al eliminar la inscripción del competidor, por favor intenta de nuevo."
			);
		}

		closeModal();
	};
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
											¿Estas seguro que quieres eliminar
											la inscripcion de NOMBRE Y APELLIDO
											DEL COMPETIDOR a esta categoria?
											NOMBRE DE LA CATEGORIA
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
			<div
				className={`flex items-center w-full px-1 py-1.5 font-bold justify-between  transition-all ease-fluid border 
                                    border-transparent rounded-lg`}
			>
				<IconsCategoryName category={category} />
				<Trash2
					onClick={openModal}
					size={30}
					className="transition-all ease-fluid fill-transparent stroke-red hover:transition-all hover:ease-fluid hover:fill-red cursor-pointer"
				/>
			</div>
		</>
	);
};

export default EnrolledCategory;
