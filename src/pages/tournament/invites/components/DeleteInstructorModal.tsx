import Modal from '@/components/Modal'
import { InviteeSchemaT } from '../schemas';
import Button from '@/components/Button';
import { deleteInvitee } from '@/services/tournament/invitationService';
import { useManageInvites } from '../InvitesContext';

type DeleteInstructorModalProps = {
    isOpen: boolean;
    closeModal: () => void;
    instructor: InviteeSchemaT;
}

const DeleteInstructorModal = ({isOpen, closeModal, instructor}: DeleteInstructorModalProps) => {
    const {launchUpdateInvitees} = useManageInvites()

    return (
        <Modal
            title="Eliminar Inscripción"
            isOpen={isOpen}
            closeModal={closeModal}
        >
            <p className="text-md text-muted text-center">
                {`Estas a punto de eliminar a ${instructor.firstname} ${instructor.lastname} como instructor autorizado`}
                <br /><br />
                Esto accion no le permitira inscribir a mas competidores a ninguna categoria.
                {/* <span className="text-orange font-black">{"> "}</span>
                <span className="text-neutrallight">
                    {buildCategoryName(category)}
                </span> */}
            </p>
            <div className="flex mt-1.5 gap-2 justify-between">
                <Button
                    variant="secondary"
                    onClick={(e) => {
                        e.preventDefault();
                        closeModal();
                    }}
                >
                    Atras
                </Button>
                <Button
                    variant="primary"
                    onClick={(e) => {
                        e.preventDefault();
                        deleteInvitee(instructor.uuid)
                        launchUpdateInvitees();
                        closeModal();
                    }}
                >
                    Eliminar Instructor
                </Button>
            </div>
        </Modal>
    )
}

export default DeleteInstructorModal
