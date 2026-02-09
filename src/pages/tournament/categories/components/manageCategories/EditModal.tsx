import Modal from "@/components/Modal";
import { useManageCategories } from "./ManageCategoryContext";
import { CategoryModalTypes } from "../../types";
import Button from "@/components/Button";

const EditModal = () => {
  const { isEditModalOpen, closeModal } = useManageCategories();

  return (
    <Modal
      isOpen={isEditModalOpen}
      closeModal={() => closeModal(CategoryModalTypes.EDIT)}
      title="Editar Categoría"
    >
      <p className="text-md text-muted text-center">
        ¿Estás seguro que querés guardar los cambios?
      </p>

      <div className="flex mt-1.5 gap-2 justify-between">
        <Button
          variant="secondary"
          type="button"
          onClick={() => closeModal(CategoryModalTypes.EDIT)}
        >
          Cerrar
        </Button>

        <Button
          variant="primary"
          type="submit"
          form="edit-category-form"
          onClick={() => closeModal(CategoryModalTypes.EDIT)}
        >
          Estoy seguro
        </Button>
      </div>
    </Modal>
  );
};

export default EditModal